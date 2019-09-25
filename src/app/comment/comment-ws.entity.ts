import {Injectable} from '@angular/core'
import {Subject} from 'rxjs'


/**
 * 模拟websocket订阅
 */

@Injectable({
  providedIn: 'root'
})
export class CommentWsEntity {

  newComment$: Subject<string> = new Subject()

  send (msg: string) {
    setTimeout(() => {
      this.newComment$.next(msg)
    }, 50)
  }
}