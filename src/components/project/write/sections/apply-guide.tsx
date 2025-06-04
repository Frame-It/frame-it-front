import Guide from '@/components/common/guide';

const ApplyGuide = () => {
  const guides = [
    '컨셉과 관련된 사진을 업로드해주세요.',
    '타인의 초상권, 지식 재산권 등을 침해하는 사진은 게시하지 마세요.',
  ];
  return <Guide guides={guides} title="지원 안내" />;
};

export default ApplyGuide;
