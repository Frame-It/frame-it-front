import ManagementTabs from '@/components/project/management-tabs';
import ProjectList from '@/components/project/project-list';
import { cn } from '@/lib/utils';
import { faker } from '@faker-js/faker';

const ProjectManagementListPage = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ManagementTabs />
      <div className={cn('flex h-[calc(100%-37px)] flex-1 flex-col p-4')}>
        <ProjectList
          // projectList={[]}
          projectList={[
            {
              id: faker.string.uuid(),
              date: '7/31',
              time: '12:00~14:00',
              location: '서울시 종로구',
              state: 'recruiting',
              title: '노들섬에서 촬용해 주세요',
            },
            {
              id: faker.string.uuid(),
              date: '7/31',
              time: '12:00~14:00',
              location: '서울시 종로구',
              state: 'recruiting',
              title: '노들섬에서 촬용해 주세요',
            },
            {
              id: faker.string.uuid(),
              date: '7/31',
              time: '12:00~14:00',
              location: '서울시 종로구',
              state: 'recruiting',
              title: '노들섬에서 촬용해 주세요',
            },
            {
              id: faker.string.uuid(),
              date: '7/31',
              time: '12:00~14:00',
              location: '서울시 종로구',
              state: 'recruiting',
              title: '노들섬에서 촬용해 주세요',
            },
            {
              id: faker.string.uuid(),
              date: '7/31',
              time: '12:00~14:00',
              location: '서울시 종로구',
              state: 'recruiting',
              title: '노들섬에서 촬용해 주세요',
            },
            {
              id: faker.string.uuid(),
              date: '7/31',
              time: '12:00~14:00',
              location: '서울시 종로구',
              state: 'inProgress',
              title: '노들섬에서 촬용해 주세요',
            },
            {
              id: faker.string.uuid(),
              date: '7/31',
              time: '12:00~14:00',
              location: '서울시 종로구',
              state: 'inProgress',
              title: '노들섬에서 촬용해 주세요',
            },
            {
              id: faker.string.uuid(),
              date: '7/31',
              time: '12:00~14:00',
              location: '서울시 종로구',
              state: 'complete',
              title: '노들섬에서 촬용해 주세요',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProjectManagementListPage;
