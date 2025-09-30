import { Meta, StoryObj } from '@storybook/angular';
import { OrderListComponent } from './order-list.component';

const meta: Meta<OrderListComponent> = {
  title: 'Components/OrderList',
  component: OrderListComponent,
  argTypes: {
    label: { control: { type: 'text' } },
    price: { control: { type: 'number' } },
    clicked: { action: 'clicked event' },
  },
};

export default meta;
type Story = StoryObj<OrderListComponent>;

export const Default: Story = {
  args: {
    label: 'Pizza Margherita',
    price: 8,
  },
};

export const Premium: Story = {
  args: {
    label: 'Pizza Tartufo',
    price: 20,
  },
};
