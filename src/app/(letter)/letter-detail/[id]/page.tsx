import BackButton from '@/components/common/back-button';
import {
  Header,
  HeaderCenter,
  HeaderLeft,
  HeaderRight,
} from '@/components/common/header';
import Icon from '@/components/common/icon';
import LetterList from '@/components/letter/letter-list';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getChatMessageUsingServer } from '@/service/server-actions/chat';
import { getMyPage } from '@/service/server-actions/my-service';

export default async function LetterDetailPage() {
  const myInfo = await getMyPage();
  const chatData = await getChatMessageUsingServer(myInfo?.id);

  return (
    <>
      <Header className="border-none shadow-none">
        <HeaderLeft>
          <BackButton>
            <Icon id="back-icon" className="size-[32px] text-gray-40" />
          </BackButton>
        </HeaderLeft>
        <HeaderCenter>{chatData?.participants[0].name}</HeaderCenter>
        <HeaderRight>
          <div className="size-[32px]"></div>
        </HeaderRight>
      </Header>
      <main className="relative overflow-y-auto pt-[78px] xl:py-0">
        <ScrollArea className="h-[calc(100dvh-73px-58px)] w-full px-[16px] xl:h-[calc(800px-73px-58px-24px)]">
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
          <LetterList
            myId={myInfo?.id}
            myImage={myInfo?.profileImageUrl || ''}
          />
        </ScrollArea>
      </main>
    </>
  );
}
