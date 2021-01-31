import React from "react";

export default ({ close }) => (
  <div className="menu">
    <ul>
      <li onClick={close}>수정</li>
      <li onClick={close}>삭제</li>
      <li onClick={close}>답글 달기</li>
      <li onClick={close}>닫기</li>

    </ul>
  </div>
);
