import React from 'react';
import { Button, ButtonGroup, Alert } from 'react-bootstrap';
import { removeDocument } from '../../api/documents/methods';
import { browserHistory } from 'react-router';
import Griddle from 'griddle-react';

const handleRemove = (_id) => {
  if (confirm('Are you sure? This is permanent!')) {
    removeDocument.call({ _id }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Document deleted!', 'success');
        browserHistory.push('/documents');
      }
    });
  }
};

var actionButtons = React.createClass({
  render: function () {
    return (
        <div>
          <ButtonGroup>
            <Button bsSize="xsmall" href={'/documents/' + this.props.rowData._id}>View</Button>
            <Button bsSize="xsmall" href={'/documents/' + this.props.rowData._id + '/edit'}>Edit</Button>
            <Button bsSize="xsmall" onClick={ () => handleRemove(this.props.rowData._id) } bsStyle="danger">Delete</Button>
          </ButtonGroup>
        </div>
    );
  }
});

const columnList = ['title','body','actions'];
const columnMetadata = [
  {columnName: 'title', order: "1", displayName: 'Title', cssClassName: 'col-xs-2' },
  {columnName: 'body', order: "2", displayName: 'Body', cssClassName: 'col-xs-7' },
  {columnName: 'actions', order: "3", customComponent: actionButtons, sortable: false, cssClassName: 'col-xs-3',
    displayName: 'Actions'}
];

const DocumentsList = ({ documents }) => (
    documents.length > 0 ?
        <Griddle
            results={documents}
            useGriddleStyles={false}
            tableClassName={'griddle-flex table table-bordered table-striped table-hover'}
            settingsToggleClassName='btn btn-default'
            useCustomPagerComponent={false}
            showFilter={true}
            showSettings={true}
            resultsPerPage={50}
            columnMetadata={columnMetadata}
            columns={columnList}/> :
  <Alert bsStyle="warning">No documents yet.</Alert>
);

DocumentsList.propTypes = {
  documents: React.PropTypes.array,
};

export default DocumentsList;
