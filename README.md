## Frameit:프레이밋

[배포 링크](https://www.frameit.kr/)

### 프레이밋이란?

프레이밋은 사진을 찍는 사람(작가)와 본인의 사진을 남기고 싶은 사람(모델)을 연결시켜주는 플랫폼입니다.

프레이밋에서는 프로젝트를 개설하고 신청할 수 있으며, 개인 포트폴리오를 업로드하여 다른 유저와 연결될 수 있습니다.

### 기간

> 2024.05 ~ 진행 중

### 구성원

- FE: 오황석([@osh6006](https://github.com/osh6006)), 최주은([@jee-woo](https://github.com/jee-woo))
- BE: 유재민([@yujamint](https://github.com/yujamint)), 전인표([@ingpyo](https://github.com/ingpyo))
- 기획: 정지원
- 디자인: 박다혜, 박소은

## 기능

### 1. 회원가입 / 로그인

<div style="display: flex; flex-direction: column; gap: 8px;">
<div style="display: flex; gap: 8px;">
  <img src="https://github.com/user-attachments/assets/c6f50819-8f67-4d2a-b469-27352cf5fa9e" alt="회원가입, 로그인 화면" width="240"/>
  <img src="https://github.com/user-attachments/assets/0857ae23-fda2-48dc-95ba-417aaf70a486" alt="회원가입 약관 화면" width="240"/>
  <img src="https://github.com/user-attachments/assets/9c945cf2-a233-412a-8741-c93524323b71" alt="역할 선택 화면" width="240"/>
</div>
<div style="display: flex; gap: 8px;">
  <img src="https://github.com/user-attachments/assets/47fa429d-6bcb-4a1b-a323-4283645fffcb" alt="이름, 생년월일 입력 화면" width="240"/>
  <img src="https://github.com/user-attachments/assets/7c15adaa-59d2-43a2-abb5-d75324b3b4ca" alt="닉네임 입력 화면" width="240"/>
  <img src="https://github.com/user-attachments/assets/5d17fe4b-d650-4378-b2c2-c83f44e9e51e" alt="회원가입 완료 화면" width="240"/>
</div>
</div>

<hr />

- 카카오와 구글 아이디를 통해 로그인할 수 있습니다. 비회원의 경우 프로젝트 공고 목록과 피드 목록을 볼 수 있습니다.
- 사용자는 작가와 모델 중 하나의 역할을 선택하여 회원가입 할 수 있습니다.
- 프레이밋에서는 닉네임으로 활동합니다.

### 2. 모집

> 프레이밋의 핵심 기능으로, 프로젝트 호스트와 작가 혹은 모델을 연결하는 서비스입니다.
>
> 호스트가 게시한 프로젝트 공고에 맞는 사용자들이 프로젝트에 신청하여, 적합한 파트너를 쉽게 찾을 수 있습니다.

#### 모집 공고

<div style="display: flex; flex-direction: column; gap: 8px;">
  <div style="display: flex; gap: 8px;">
    <img src="https://github.com/user-attachments/assets/148e2e0b-d1b3-4155-b5a8-790ec27635e7" alt="모집 목록" width="240"/>
    <img src="https://github.com/user-attachments/assets/08a26d93-32a3-4f3e-9a2f-757e2d282b25" alt="공고 상세 화면" width="240"/>
    <img src="https://github.com/user-attachments/assets/c2f0d2bc-cfa5-458e-a5b5-d75eb359c633" alt="프로젝트 신청 모달" width="240"/>
  </div>
</div>
<hr />

- 프로젝트 공고: 사용자들은 자신과 맞는 프로젝트를 선택하고 신청할 수 있습니다.
- 북마크 기능: 관심 있는 프로젝트 공고는 북마크하여 관리가 용이합니다.

<!--
- 모집
- 프로젝트 공고
- 프로젝트 관리
- 스튜디오 > 프로젝트/리뷰 탭
- 북마크 -->

### 3. 탐색

> 작가와 모델이 자신의 작업물을 포트폴리오로 업로드하고 공유할 수 있는 공간입니다.

- 피드: 다른 사용자들의 포트폴리오를 피드 형태로 볼 수 있습니다.
- 마이 스튜디오: 사진 작업물이 담긴 포트폴리오를 등록할 수 있습니다.

<!-- #### 관련 페이지:

탐색
포트폴리오 상세
스튜디오
마이 스튜디오 -->

### 4. 스튜디오

> 사용자 활동 내역을 기록하고 표현하는 개인 페이지입니다.
> 프로젝트 관리, 포트폴리오 등록, 프로필 수정 등 다양한 활동을 할 수 있습니다.

<!-- 관련 페이지:

마이 스튜디오
스튜디오
포트폴리오 등록
프로필 수정 -->

## 기술 스택

## 프로젝트 실행

```bash
npm run dev
```
