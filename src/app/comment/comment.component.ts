import { Component, Input, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommentUcase } from './comment.ucase'
import {interval, merge} from 'rxjs';
import {throttle} from 'rxjs/operators';
import {CommentItem} from './comment.type'


@Component({
  selector: 'app-comment',
  template: `
  <div style="border: 1px solid red">
    <h1>app-comment</h1>

    <div>
      用户名: {{commentUcase.userName}}
    </div>
  
    <div>
      输入评论: <input type="input" [(ngModel)]="commentInput">
      <input type="button" (click)="sendComment()" value="发送">
    </div>

    <div>
      <input type="button" (click)="commentUcase.clearComment()" value="清空评论">
    </div>

    <div>
      海量信息发送测试：
      <input *ngIf="!isTesting" type="button" value="测试" (click)="startTest()">
      <input *ngIf="isTesting" type="button" value="结束测试" (click)="stopTest()">
    </div>

    <div>
      <h3>评论列表, 个数 {{commentList.length}}</h3>
      <div *ngFor="let comment of commentList" style="padding: 2px;">
        {{comment.name}}: {{comment.content}}
        <span (click)="deleteComment(comment.id)" style="display: inline-block; background: gray; padding: 0 5px; cursor: pointer;">x</span>
      </div>
    </div>
  </div>
  `,
  styles: [`h1 { font-family: Lato; }`]
})
export class CommentComponent implements OnInit, OnDestroy {

  private commentInput: string = ''
  private isTesting: boolean = false
  private commentList: CommentItem[] = []

  constructor (
    private commentUcase: CommentUcase,
    private ngZone: NgZone
  ) {
  }

  ngOnInit () {
    this.commentUcase.startSubNewComment()

    // 2000ms渲染一次
    this.commentUcase.commentList$
      .pipe(throttle(val => interval(2000)))
      .subscribe(list => {
        this.commentList = list
      })
  }

  ngOnDestroy () {
    this.commentUcase.stopSubNewComment()
  }

  sendComment () {
    if (!this.commentInput) {
      alert('请输入评论内容')
      return
    }
    this.commentUcase.sendComment(this.commentInput)
    this.commentInput = ''
  }

  deleteComment (commentId: number) {
    this.commentUcase.deleteComment(commentId)
  }

  startTest () {
    this.isTesting = true
    this.commentUcase.testMassiveMessage()
  }

  stopTest () {
    this.isTesting = false
    this.commentUcase.stopMassiveMessage()
  }
}
