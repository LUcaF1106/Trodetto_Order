import { Meta, StoryObj } from '@storybook/angular';
import { OrderListComponent } from './order-list.component';

const meta: Meta<OrderListComponent> = {
  title: 'Components/Order',
  component: OrderListComponent,
};

export default meta;
type Story = StoryObj<OrderListComponent>;

export const Default: Story = {};
