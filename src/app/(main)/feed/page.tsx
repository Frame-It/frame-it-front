import Header from '@/components/common/header';
import React from 'react';

export default function FeedPage() {
  return (
    <div>
      <Header
        left={<div>왼쪽</div>}
        center={<div>중간</div>}
        right={<div>오른쪽</div>}
      />
    </div>
  );
}
