import LetterList from '@/components/letter/letter-list';
import LetterSandForm from '@/components/letter/letter-sand-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { talkList } from '@/constants/data';

export default function LetterDetailPage() {
  return (
    <>
      <Accordion
        type="single"
        collapsible
        className="z-50 mx-auto w-full max-w-[328px]"
      >
        <AccordionItem value="item-1" className="overflow-hidden bg-white">
          <AccordionTrigger className="">
            프레이밋 커뮤니티 안내
          </AccordionTrigger>
          <AccordionContent className="">
            상대방에게 불쾌감을 줄 수 있는 언행을 하는 경우 제재를 당하실 수
            있습니다. 바람직한 커뮤니티를 만들어 주세요.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <LetterList letterList={talkList} />
      <LetterSandForm />
    </>
  );
}
