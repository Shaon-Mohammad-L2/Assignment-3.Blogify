import { Model, Types } from 'mongoose'

export type TBlog = {
  title: string
  content: string
  author: Types.ObjectId
  isPublished: boolean
}

export interface BlogModel extends Model<TBlog> {
  isBlogExistsFindById(id: string): Promise<TBlog>
  isBlogIsPrivate(id: string, author: Types.ObjectId): Promise<boolean>
}
