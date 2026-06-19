import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  args: {
    page: 2,
    pageCount: 6,
    total: 142,
    perPage: 25,
    showGoTo: false,
  },
  argTypes: {
    showGoTo: { control: 'boolean' },
  },
  render: (args) => {
    const Interactive = () => {
      const [page, setPage] = useState(args.page);
      const [perPage, setPerPage] = useState(args.perPage ?? 25);
      return (
        <div className="w-[760px]">
          <Pagination
            {...args}
            page={page}
            perPage={perPage}
            onPageChange={setPage}
            onPerPageChange={(n) => {
              setPerPage(n);
              setPage(1);
            }}
          />
        </div>
      );
    };
    return <Interactive />;
  },
};
export default meta;

type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: { page: 2, pageCount: 6, total: 142, perPage: 25 },
};

export const FirstPage: Story = {
  args: { page: 1, pageCount: 6, total: 142, perPage: 25 },
};

export const LastPage: Story = {
  args: { page: 6, pageCount: 6, total: 142, perPage: 25 },
};

export const WithGoTo: Story = {
  args: { page: 4, pageCount: 12, total: 295, perPage: 25, showGoTo: true },
};

export const Overview: Story = {
  render: () => (
    <div className="flex w-[760px] flex-col gap-6">
      <Pagination page={1} pageCount={6} total={142} perPage={25} />
      <Pagination page={3} pageCount={6} total={142} perPage={25} />
      <Pagination page={6} pageCount={6} total={142} perPage={25} />
      <Pagination page={5} pageCount={20} total={487} perPage={25} showGoTo />
    </div>
  ),
};
