import { Meta, Story } from '@storybook/react/types-6-0';
import { SpendingInput, SpendingInputProps } from './spendingInput';
import { CssBaseline } from '@material-ui/core';

export default {
  title: 'Money/SpendingsInput',
  component: SpendingInput,
} as Meta;

const Template: Story<SpendingInputProps> = (args) => (
  <CssBaseline>
    <SpendingInput {...args} />
  </CssBaseline>
);

export const Basic = Template.bind({});
Basic.args = {};
