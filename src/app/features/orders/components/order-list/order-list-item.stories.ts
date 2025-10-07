import { Meta, StoryObj } from '@storybook/angular';
import { OrderListItemComponent } from './order-list-item.component';

const meta: Meta<OrderListItemComponent> = {
  title: 'Components/OrderListItem',
  component: OrderListItemComponent,
  argTypes: {
    label: { control: { type: 'text' } },
    price: { control: { type: 'number' } },
    urlImg: { control: { type: 'text' } },
    clicked: { action: 'clicked event' },
  },
};

export default meta;
type Story = StoryObj<OrderListItemComponent>;

export const Default: Story = {
  args: {
    label: 'Pizza Margherita',
    urlImg: 'placeholder.jpg',
    price: 8,
  },
};

export const Premium: Story = {
  args: {
    ...Default.args,
    label: 'Pizza Tartufo',
    price: 20,
  },
};
