import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { useProjectRegisterStore } from '@/store/project-regist-store';
import { PlusIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ImageUploadSection = () => {
  const form = useFormContext();
  const { setProjectInfo, projectInfo } = useProjectRegisterStore();
  const [previews, setPreviews] = useState<string[]>(
    projectInfo.photoUrls ?? [],
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles, displayUrls } = getImageData(e);

    if (previews.length + displayUrls.length > 10) {
      toast({
        title: '사진은 최대 10장까지 등록 가능해요!',
      });
      return;
    }

    const newFilesArray = Array.from(newFiles) as File[];
    const updatedPreviews = [...previews, ...displayUrls];
    const updatedFiles = [...form.getValues('photos'), ...newFilesArray];

    setPreviews(updatedPreviews);
    form.setValue('photos', updatedFiles);

    setProjectInfo({
      ...projectInfo,
      photos: updatedFiles,
    });
  };

  return (
    <section className="flex h-fit flex-shrink-0 items-center gap-2 overflow-x-auto scrollbar-hide">
      {form.watch('photos')?.length >= 10 ? null : (
        <FormField
          control={form.control}
          name="photos"
          render={() => (
            <FormItem>
              <FormControl>
                <>
                  <FormLabel
                    htmlFor="images"
                    className="relative flex h-[87px] w-[95px] cursor-pointer flex-col items-center justify-center rounded-[8px] border border-gray-60"
                  >
                    <PlusIcon size={32} className="text-gray-40" />
                    <Input
                      id="images"
                      accept="image/*"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </FormLabel>
                </>
              </FormControl>
            </FormItem>
          )}
        />
      )}
      <div className="flex items-center gap-2">
        {previews.map((preview, index) => (
          <div key={index} className="relative flex h-[87px] w-[95px] gap-2">
            <img
              alt={`preview-${index}`}
              src={preview}
              width={95}
              height={87}
              className="rounded-[8px] object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const dataTransfer = new DataTransfer();

  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image),
  );

  const files = dataTransfer.files;
  const displayUrls = Array.from(event.target.files!).map((file) =>
    URL.createObjectURL(file),
  );

  return { files, displayUrls };
}

export default ImageUploadSection;
