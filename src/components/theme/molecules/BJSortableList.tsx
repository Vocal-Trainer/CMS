import { Avatar, Space, Typography } from "antd";
import { FaGripLines } from "react-icons/fa";
import styled from "styled-components";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const { Paragraph } = Typography;

export type SortContentType = {
  id: string | number;
  imageUrl?: string;
  noImage?: boolean;
  title?: string;
};

export type SortProps = {
  oldIndex: number;
  newIndex: number;
};

export type BaseSortType = {
  id: UniqueIdentifier;
  sortOrder?: number;
  noImage?: boolean;
  imageUrl?: string;
  title?: string;
  disableDrag?: boolean;
};

export const BJSortableList = <T extends BaseSortType>({
  items,
  onSortEnd,
  render,
  disableDrag,
}: {
  items: T[];
  onSortEnd: ({ oldIndex, newIndex }: SortProps) => void;
  render?: (contentMenu: T) => JSX.Element;
  disableDrag?: boolean;
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { delay: 100, tolerance: null },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={event => {
        const { active, over } = event;
        const oldIndex = items.findIndex(x => x.id === active.id);
        const newIndex = items.findIndex(x => x.id === over.id);
        onSortEnd({ oldIndex, newIndex });
      }}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items?.map(item => (
          <SortableItem
            key={item.id}
            value={item}
            render={render}
            disableDrag={disableDrag} // temporarly disabled drag on menu
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export function SortableItem<T extends BaseSortType>({
  value,
  render,
  disableDrag,
}: {
  value: T;
  render?: (contentMenu: T) => JSX.Element;
  disableDrag?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: value.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "baseline",
    justifyContent: render && "center",
  };
  const props = disableDrag
    ? {}
    : { style: style, ...attributes, ...listeners };

  return (
    <div ref={setNodeRef} {...props}>
      {render ? (
        <>
          {!disableDrag && <StyledGrip />}
          {render(value)}
        </>
      ) : (
        <StyledListItem size={30} key={value.id}>
          <FaGripLines />
          {!value.noImage && value?.imageUrl && <Avatar src={value.imageUrl} />}
          <Paragraph>{value.title}</Paragraph>
        </StyledListItem>
      )}
    </div>
  );
}

const StyledListItem = styled(Space)`
  cursor: move;
  z-index: 1;
  margin-bottom: 1rem;
`;

const StyledGrip = styled(FaGripLines)`
  cursor: move;
  z-index: 1;
`;
