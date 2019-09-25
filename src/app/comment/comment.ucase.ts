import { Injectable } from '@angular/core'
import { CommentItem } from './comment.type'
import {ngBehaviorSubject} from '../utils/decorator'
import {BehaviorSubject, Subscription} from 'rxjs'
import {CommentWsEntity} from './comment-ws.entity'


@Injectable({
  providedIn: 'root'
})
export class CommentUcase {

  @ngBehaviorSubject('harry')
  userName: string
  userName$: BehaviorSubject<string>

  // 这个装饰器会生成一个对应的'commentList$'可订阅对象，可以通过这个对象来使用rxjs，进行流的控制
  @ngBehaviorSubject([])
  commentList: CommentItem[]
  commentList$: BehaviorSubject<CommentItem[]>

  private timer: number = 0
  private wsSub: Subscription

  constructor (
    private commentWsEntity: CommentWsEntity
  ) {}
  
  startSubNewComment () {
    this.wsSub = this.commentWsEntity.newComment$.subscribe(msg => {
      var comment: CommentItem = JSON.parse(msg)
      this.commentList = [comment, ...this.commentList]
    })
  }

  stopSubNewComment () {
    this.wsSub.unsubscribe()
  }

  setUserName (userName: string) {
    this.userName = userName
  }

  sendComment (content: string) {
    const comment: CommentItem = {
      content,
      name: this.userName,
      id: Date.now() + Math.random(),
    }
    this.commentWsEntity.send(JSON.stringify(comment))
  }

  deleteComment (commentId: number) {
    this.commentList = this.commentList.filter(comment => comment.id !== commentId)
  }


  testMassiveMessage () {
    let idx = 1
    this.timer = setInterval(() => {
      this.sendComment('海量信息测试' + idx)
    }, 5)
  }

  stopMassiveMessage () {
    clearInterval(this.timer)
  }

  clearComment () {
    this.commentList = []
  }

}