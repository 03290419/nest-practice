## 리다이렉트 동적할당

```ts
  @Get('redirect/docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
```

## 라우트 매개변수

```ts
 @Delete(':userId/memo/:memoId')
  deleteUserMemo(
    @Param('userId') userId: string,
    @Param('memoId') memoId: string,
  ) {
    return `userId: ${userId}, memoId: ${memoId}`;
  }
```

## 하위 도메인 라우팅

```ts
@Controller({ host: 'api.localhost' })
export class ApiController {
  @Get()
  index(): string {
    return 'hello API';
  }
}
```

### @HostParam 을 이용한 서브도메인 동적 할당

```ts
@Controller({ host: ':version.api.localhost' })
export class ApiController {
  @Get()
  index(@HostParam('version') version: string): string {
    return `Hello, API ${version}`;
  }
}
```

## Payload 다루기

nest는 payload를 dto로 다룸
