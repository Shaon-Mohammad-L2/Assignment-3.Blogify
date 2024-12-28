import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  constructor(
    public modelQuery: Query<T[], T>,
    public query: Record<string, unknown>
  ) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchAbleFileds: string[]) {
    const search = this?.query?.search

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleFileds.map(
          filed =>
            ({
              [filed]: { $regex: search, $options: 'i' }
            }) as FilterQuery<T>
        )
      })
    }
    return this
  }

  filter(key: string) {
    const queryObj = { ...this.query }
    if (this?.query?.filter) {
      queryObj[key] = this.query.filter
    }
    const excludesFileds = ['search', 'sortBy', 'sortOrder', 'filter']
    excludesFileds.forEach(el => delete queryObj[el])
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
    return this
  }

  sort() {
    const sortBy = (this?.query?.sortBy as string)?.split(',') || ['createdAt']

    let sortOrder = '-'
    if (this?.query?.sortOrder === 'asc') {
      sortOrder = ''
    } else if (this?.query?.sortOrder === 'desc') {
      sortOrder = '-'
    }

    const sortString = sortBy
      .map(filed =>
        filed.startsWith('-') || filed.startsWith('+')
          ? filed
          : `${sortOrder}${filed}`
      )
      .join(' ')

    this.modelQuery = this.modelQuery.sort(sortString)
    return this
  }
}

export default QueryBuilder
