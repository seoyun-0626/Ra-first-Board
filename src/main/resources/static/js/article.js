function csrf() {
  const token = document.querySelector('meta[name="_csrf"]')?.content;
  const header = document.querySelector('meta[name="_csrf_header"]')?.content || 'X-CSRF-TOKEN';
  if (!token) console.warn('CSRF token not found in meta tags.');
  return { header, token };
}


// 삭제
const deleteButton = document.getElementById('delete-btn');
if (deleteButton) {
  deleteButton.addEventListener('click', async () => {
    const id = document.getElementById('article-id')?.value;
    if (!id) return alert('id가 없습니다.');
//    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
const { header, token } = csrf();
   const res = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
      headers: token ? { [header]: token } : undefined,
      credentials: 'same-origin'
    });
    if (!res.ok) return alert('삭제 실패: ' + res.status);
    alert('삭제가 완료되었습니다.');
    location.replace('/articles');
  });
}

// 수정
const modifyButton = document.getElementById('modify-btn');
if (modifyButton) {
  modifyButton.addEventListener('click', async () => {
    const id = document.getElementById('article-id')?.value;
    if (!id) return alert('id가 없습니다.');
    const body = {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value
    };
/*    const res = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });*/
    const { header, token } = csrf();
        const res = await fetch(`/api/articles/${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            ...(token ? { [header]: token } : {})
          },
          body: JSON.stringify(body),
          credentials: 'same-origin'
        });
    if (!res.ok) return alert('수정 실패: ' + res.status);
    alert('수정이 완료되었습니다.');
    location.replace(`/articles/${id}`);
  });
}

// 생성
const createButton = document.getElementById('create-btn');
if (createButton) {
  createButton.addEventListener('click', async () => {
    const body = {
      title: document.getElementById('title').value,
      content: document.getElementById('content').value
    };
/*    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });*/
    const { header, token } = csrf();    // 서버에서 HTML에 심어준 _csrf 값 꺼내서 header 헤더 이름 (X-CSRF-TOKEN 같은 거),token(실제 보안값) 에넣어야 Sping Security가 허락함
        const res = await fetch('/api/articles', {   //서버에 새 글저장해!하고요청보내기
          method: 'POST',    //   /api/articles 이주소로 PSOT 요청
          headers: {
            "Content-Type": "application/json",   // → JSON 형식 보낸다고 알려줌
            ...(token ? { [header]: token } : {})    //CSRF 토큰 있으면 같이 보냄
          },
          body: JSON.stringify(body),    // body → 제목/내용 데이터를 JSON으로 바꿔서 넣음
          credentials: 'same-origin'   //브라우저가 서버에 요청을 보낼 때, 같은 출처(도메인)일 경우 자동으로 쿠키나 인증 정보를 포함하도록 하는 설정
        });
    if (!res.ok) return alert('등록 실패: ' + res.status);
    alert('등록 완료되었습니다.');
    location.replace('/articles');
  });
}