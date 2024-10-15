import Icon from '@/components/common/icon';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useDisclosure from '@/hooks/useDisclosure';
import { ProfileFormType } from '@/lib/schema/profile-schema';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IProfileImageSelectorProps {
  form: UseFormReturn<ProfileFormType>;
  prevImageUrl?: string | null;
}

const ProfileImageSelector: React.FC<IProfileImageSelectorProps> = ({
  form,
  prevImageUrl,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    prevImageUrl || null,
  );

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue('profileImage', file);
    }

    onClose();
  };

  const handleDelete = () => {
    // TODO : 삭제시키기
  };

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <div className="relative mx-auto mt-4 h-[114px] w-[114px]">
        <img
          src={previewImage || '/png/profile.png'}
          alt="프로필 이미지"
          className="overflow-hidden rounded-[16px] bg-cover bg-center"
        />
        <button
          type="button"
          onClick={onOpen}
          className="absolute -right-2 bottom-0 flex h-7 w-7 items-center justify-center rounded-full bg-gray-90 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <mask id="path-1-inside-1_2943_4246" fill="white">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 5.5H11.8094C12.1174 6.44918 13.0071 7.06 13.972 7.06H15.5V14.5H10H10H4.5V7.06H6.02802C6.99287 7.06 7.88256 6.44918 8.19065 5.5H10H10ZM7.64941 4H10H10H12.3506C12.6965 4 13.0002 4.22349 13.0938 4.54696L13.2288 5.01304C13.3224 5.33651 13.6261 5.56 13.972 5.56H16.2279C16.6543 5.56 17 5.89579 17 6.31V15.25C17 15.6642 16.6543 16 16.2279 16H10H10H3.77206C3.34566 16 3 15.6642 3 15.25V6.31C3 5.89579 3.34566 5.56 3.77206 5.56H6.02802C6.37392 5.56 6.67761 5.33651 6.77125 5.01304L6.90618 4.54696C6.99982 4.22349 7.30351 4 7.64941 4ZM11.5 10.75C11.5 11.5784 10.8284 12.25 10 12.25C9.17157 12.25 8.5 11.5784 8.5 10.75C8.5 9.92157 9.17157 9.25 10 9.25C10.8284 9.25 11.5 9.92157 11.5 10.75ZM13 10.75C13 12.4069 11.6569 13.75 10 13.75C8.34315 13.75 7 12.4069 7 10.75C7 9.09315 8.34315 7.75 10 7.75C11.6569 7.75 13 9.09315 13 10.75Z"
              />
            </mask>
            <path
              d="M11.8094 5.5L13.7117 4.88255L13.2629 3.5H11.8094V5.5ZM15.5 7.06H17.5V5.06H15.5V7.06ZM15.5 14.5V16.5H17.5V14.5H15.5ZM4.5 14.5H2.5V16.5H4.5V14.5ZM4.5 7.06V5.06H2.5V7.06H4.5ZM8.19065 5.5V3.5H6.7371L6.28835 4.88255L8.19065 5.5ZM13.0938 4.54696L11.1727 5.10311V5.10311L13.0938 4.54696ZM13.2288 5.01304L15.1499 4.45689V4.45689L13.2288 5.01304ZM6.77125 5.01304L4.85013 4.45689L6.77125 5.01304ZM6.90618 4.54696L4.98506 3.9908V3.9908L6.90618 4.54696ZM11.8094 3.5H10V7.5H11.8094V3.5ZM13.972 5.06C13.8397 5.06 13.7418 4.97542 13.7117 4.88255L9.90705 6.11745C10.4931 7.92294 12.1745 9.06 13.972 9.06V5.06ZM15.5 5.06H13.972V9.06H15.5V5.06ZM17.5 14.5V7.06H13.5V14.5H17.5ZM10 16.5H15.5V12.5H10V16.5ZM10 16.5H10V12.5H10V16.5ZM4.5 16.5H10V12.5H4.5V16.5ZM2.5 7.06V14.5H6.5V7.06H2.5ZM6.02802 5.06H4.5V9.06H6.02802V5.06ZM6.28835 4.88255C6.2582 4.97542 6.16027 5.06 6.02802 5.06V9.06C7.82546 9.06 9.50692 7.92294 10.093 6.11745L6.28835 4.88255ZM10 3.5H8.19065V7.5H10V3.5ZM10 3.5H10V7.5H10V3.5ZM10 2H7.64941V6H10V2ZM10 2H10V6H10V2ZM12.3506 2H10V6H12.3506V2ZM15.0149 3.99081C14.6644 2.78002 13.553 2 12.3506 2V6C11.8399 6 11.3359 5.66696 11.1727 5.10311L15.0149 3.99081ZM15.1499 4.45689L15.0149 3.9908L11.1727 5.10311L11.3076 5.5692L15.1499 4.45689ZM13.972 3.56C14.4826 3.56 14.9866 3.89304 15.1499 4.45689L11.3076 5.56919C11.6581 6.77998 12.7695 7.56 13.972 7.56V3.56ZM16.2279 3.56H13.972V7.56H16.2279V3.56ZM19 6.31C19 4.73696 17.7039 3.56 16.2279 3.56V7.56C15.6048 7.56 15 7.05461 15 6.31H19ZM19 15.25V6.31H15V15.25H19ZM16.2279 18C17.7039 18 19 16.823 19 15.25H15C15 14.5054 15.6048 14 16.2279 14V18ZM10 18H16.2279V14H10V18ZM10 18H10V14H10V18ZM3.77206 18H10V14H3.77206V18ZM1 15.25C1 16.823 2.29614 18 3.77206 18V14C4.39518 14 5 14.5054 5 15.25H1ZM1 6.31V15.25H5V6.31H1ZM3.77206 3.56C2.29614 3.56 1 4.73696 1 6.31H5C5 7.05461 4.39519 7.56 3.77206 7.56V3.56ZM6.02802 3.56H3.77206V7.56H6.02802V3.56ZM4.85013 4.45689C5.01336 3.89304 5.51737 3.56 6.02802 3.56V7.56C7.23046 7.56 8.34185 6.77998 8.69237 5.5692L4.85013 4.45689ZM4.98506 3.9908L4.85013 4.45689L8.69237 5.5692L8.82729 5.10311L4.98506 3.9908ZM7.64941 2C6.44696 2 5.33558 2.78002 4.98506 3.9908L8.82729 5.10311C8.66406 5.66696 8.16005 6 7.64941 6V2ZM10 14.25C11.933 14.25 13.5 12.683 13.5 10.75H9.5C9.5 10.4739 9.72386 10.25 10 10.25V14.25ZM6.5 10.75C6.5 12.683 8.067 14.25 10 14.25V10.25C10.2761 10.25 10.5 10.4739 10.5 10.75H6.5ZM10 7.25C8.067 7.25 6.5 8.817 6.5 10.75H10.5C10.5 11.0261 10.2761 11.25 10 11.25V7.25ZM13.5 10.75C13.5 8.817 11.933 7.25 10 7.25V11.25C9.72386 11.25 9.5 11.0261 9.5 10.75H13.5ZM10 15.75C12.7614 15.75 15 13.5114 15 10.75H11C11 11.3023 10.5523 11.75 10 11.75V15.75ZM5 10.75C5 13.5114 7.23858 15.75 10 15.75V11.75C9.44772 11.75 9 11.3023 9 10.75H5ZM10 5.75C7.23858 5.75 5 7.98858 5 10.75H9C9 10.1977 9.44772 9.75 10 9.75V5.75ZM15 10.75C15 7.98858 12.7614 5.75 10 5.75V9.75C10.5523 9.75 11 10.1977 11 10.75H15Z"
              fill="#7E7774"
              mask="url(#path-1-inside-1_2943_4246)"
            />
          </svg>
        </button>
      </div>
      <DrawerContent className="rounded-t-l-[16px] rounded-t-r-[16px] pb-[20px] pt-[18px]">
        <ul className="flex flex-col gap-y-[6px]">
          <li>
            <Label htmlFor="profileImage" className="h-full w-full">
              <div className="flex w-full items-center gap-x-[13px] px-[18px] py-2 text-base font-semibold leading-[135%] text-gray-20">
                <Icon id="edit-icon" size={24} />
                프로필 사진 변경
              </div>
            </Label>
            <Input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </li>
          <li>
            <button
              onClick={handleDelete}
              className="flex w-full items-center gap-x-[13px] px-[18px] py-2 text-base font-semibold leading-[135%] text-gray-20"
            >
              <Icon id="close-icon" size={24} className="text-gray-40" />
              프로필 사진 삭제하기
            </button>
          </li>
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileImageSelector;
