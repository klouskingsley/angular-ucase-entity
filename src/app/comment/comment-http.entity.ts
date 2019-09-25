import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'


/**
 * 模拟websocket订阅
 */

@Injectable({
  providedIn: 'root'
})
export class CommentHttpEntity {

  private saveDB () {

  }

  private getDB () {

  }

  sendComment (content: string, userName: string): Promise<number> {
    
  }

  deleteComment (commentId: number): Promise<void> {  }

  clearComment (): Promise<void> {  }

  getHistoryCommenetList (): Promise<CommentItem[]> {  }

}