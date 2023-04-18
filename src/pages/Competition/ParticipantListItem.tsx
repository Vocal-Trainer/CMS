import { Col, List } from "antd";

interface ContentListItemProps {
  value: Participant;
}

export const ParticipantListItem = ({ value }: ContentListItemProps) => {
  const record = {
    name: value?.name,
    point: value?.point,
  };
  return (
    <List.Item key={record.name}>
      <Col span={12}>{record?.name}</Col>
      <Col span={8}>{record.point}</Col>
    </List.Item>
  );
};
