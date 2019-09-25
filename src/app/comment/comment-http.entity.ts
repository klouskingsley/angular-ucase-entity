import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'
import {CommentItem} from './comment.d'
import {COMMENT_DB_KEY, COMMENT_MESSAGE_TYPE} from './comment.config'


/**
 * 模拟websocket订阅
 */

@Injectable({
  providedIn: 'root'
})
export class CommentHttpEntity {

  private saveDB (commentList: CommentItem[]) {
    localStorage.setItem(COMMENT_DB_KEY, JSON.parse(commentList))
  }

  private getDB (): CommentItem[] {
    const data = localStorage.getItem(COMMENT_DB_KEY)
    if (data) {
      return JSON.parse(data)
    }
    return []
  }

  sendComment (content: string, username: string): Promise<number> {
    const id = Date.now() + Math.random()
    const commentList = this.getDB()
    const comment = {
      id,
      content,
      username,
    }
    commentList.unshift(comment)
    this.saveDB(commentList)
    return Promise.resolve(id)
  }

  deleteComment (commentId: number): Promise<void> {

  }

  clearComment (): Promise<void> {  }

  getHistoryCommenetList (): Promise<CommentItem[]> {  }

}