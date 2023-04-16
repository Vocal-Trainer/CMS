import styled from "styled-components";
import BJList from "../../../components/theme/components/BJList";
import BJButton, { ButtonTypes } from "../../../components/theme/atoms/Button";
import { TableRowSelection } from "antd/lib/table/interface";
import { Modal, Table } from "antd";
import { BJColumnType } from "../molecules/BJTable";
import { Typography } from "antd";

interface Props<T> {
  show: boolean;
  error: string;
  modalWidth?: number;
  onHide: () => void;
  modalTitle: string;
  recordCountSuffix: string;
  maxNoOfContentLimit?: number;
  disable: boolean;
  columns: BJColumnType<T>[];
  dataSource: T[];
  rowSelection?: TableRowSelection<T>;
  updateSelectedRecords?: (value: T[]) => void;
  selectedRecords?: T[];
  onSubmit: () => void;
  onClickRow?: (record: T) => {
    onClick: () => void;
  };
}

const defaultPageSize = 5;

export const BJSelectListModal = <T extends { id?: string }>({
  show: showModal,
  error,
  onHide,
  dataSource,
  disable,
  updateSelectedRecords,
  selectedRecords,
  onSubmit,
  columns,
  modalTitle,
  recordCountSuffix,
  modalWidth,
}: Props<T>) => {
  const rowSelectionNew: TableRowSelection<T> = {
    type: "checkbox",
    defaultSelectedRowKeys: selectedRecords?.map(x => x.id),
    selectedRowKeys: selectedRecords?.map(x => x.id),
    columnWidth: 0.3,
    selections: [Table.SELECTION_ALL, Table.SELECTION_NONE],
    onChange: (keys: React.Key[]) => {
      if (keys.length === dataSource.length) {
        updateSelectedRecords([...dataSource]);
      }
    },

    onSelect: (selectedRecord: T, recordSelected: boolean) => {
      let currentRecFilteredList = selectedRecords?.filter(
        x => x.id !== selectedRecord.id
      );
      if (recordSelected) {
        currentRecFilteredList = [...selectedRecords, selectedRecord];
      }
      updateSelectedRecords(currentRecFilteredList);
    },
    onSelectAll: (selected: boolean, selectedRows, changeRows) => {
      if (selected) {
        const newRecords = selectedRows.filter(
          row => !selectedRecords.some(rec => rec.id === row.id)
        );
        updateSelectedRecords([...selectedRecords, ...newRecords]);
      } else {
        console.log(selectedRecords);
        const newRecords = selectedRecords.filter(
          row => !changeRows.some(rec => rec.id === row.id)
        );
        updateSelectedRecords([...newRecords]);
      }
    },
    onSelectNone: () => {
      updateSelectedRecords([]);
    },
  };

  return (
    <StyledModal
      destroyOnClose
      width={modalWidth ? modalWidth : 1000}
      maskClosable={false}
      title={modalTitle}
      visible={showModal}
      onCancel={onHide}
      footer={[
        <BJButton
          key="bjslmfb1"
          buttonType={ButtonTypes.Secondary}
          onClick={onHide}
        >
          Cancel
        </BJButton>,
        <BJButton
          key="bjslmfb2"
          buttonType={ButtonTypes.Primary}
          disabled={disable}
          onClick={() => {
            onSubmit();
          }}
        >
          Update
        </BJButton>,
      ]}
    >
      <BJList
        keyWord={modalTitle}
        rowSelection={rowSelectionNew}
        filterOnlyDisplayList
        hidePrefix={true}
        OriginalList={dataSource}
        columns={columns}
        onClickRow={selectedRecord => ({
          onClick: () => {
            let currentRecFilteredList = [];
            if (selectedRecords.some(x => x.id === selectedRecord.id)) {
              currentRecFilteredList = selectedRecords.filter(
                x => x.id !== selectedRecord.id
              );
            } else {
              currentRecFilteredList = [...selectedRecords, selectedRecord];
            }
            updateSelectedRecords(currentRecFilteredList);
          },
        })}
        recordCountSuffix={recordCountSuffix}
        defaultPageSize={defaultPageSize}
      />
      {!!error && <Typography.Text type={"danger"}>{error}</Typography.Text>}
    </StyledModal>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-footer {
    justify-content: flex-end;
    display: flex;
    align-items: center;
    .ant-space-align-center {
      margin-right: 0.625rem;
    }
  }
`;
