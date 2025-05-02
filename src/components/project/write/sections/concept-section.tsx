import ConceptTag from '@/components/common/concept-tag';
import { toast } from '@/components/ui/use-toast';
import { PROJECT_CONCEPTS } from '@/constants/project';
import { projectSchema } from '@/lib/schemas/project-schema';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

const ConceptSection = () => {
  const form = useFormContext();

  const handleTagToggle = (tagId: string) => {
    const currentTags = form.getValues('conceptTags');
    const newTags = currentTags.includes(tagId)
      ? currentTags.filter((id: string) => id !== tagId)
      : [...currentTags, tagId];

    try {
      projectSchema.shape.conceptTags.parse(newTags);
      form.setValue('conceptTags', newTags);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: error.errors[0].message,
        });
      }
    }
  };

  return (
    <div className={cn('flex flex-col gap-2')}>
      <label className={cn('font-title-16')}>컨셉</label>
      <div className={cn('flex flex-wrap gap-2')}>
        {PROJECT_CONCEPTS.map((tag) => (
          <ConceptTag
            key={tag.id}
            id={tag.id}
            label={tag.label}
            isSelected={form.watch('conceptTags').includes(tag.id)}
            onToggle={() => handleTagToggle(tag.id)}
          />
        ))}
      </div>
      {form.formState.errors.conceptTags && (
        <p className="text-sm text-red-500">
          {form.formState.errors.conceptTags.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default ConceptSection;
