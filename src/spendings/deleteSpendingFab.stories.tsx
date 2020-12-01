import { Meta, Story } from '@storybook/react/types-6-0';
import { DeleteSpendingFab, DeleteSpendingFabProps } from './deleteSpendingFab';
import { CssBaseline } from '@material-ui/core';

export default {
  title: 'Money/DeleteSpendingFab',
  component: DeleteSpendingFab,
} as Meta;

const Template: Story<DeleteSpendingFabProps> = (args) => (
  <CssBaseline>
    <DeleteSpendingFab {...args} />
  </CssBaseline>
);

export const Basic = Template.bind({});
Basic.args = {};
