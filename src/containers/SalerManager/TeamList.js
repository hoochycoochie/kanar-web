import React, { Component } from "react";
import Layout from "../common/layout";
import { compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

import MaterialTable from "material-table";
import FullModal from "../../components/FullModal";
import CreateProduct from "../../components/CreateProduct";
import { fetchMembers } from "../../store/actions/member";

const columns = [
  {
    title: "",
    field: "picture",
    sorting: false,
    filtering: false,
    render: rowData => (
      <img style={{ height: 20, borderRadius: "50%" }} src={rowData.picture} />
    )
  },
  {
    field: "name",
    title: <FormattedMessage id="name" />,

    render: rowData => <span>{rowData.name}</span>
  },
  {
    field: "lastname",
    title: <FormattedMessage id="lastname" />
  }
];

class TeamList extends Component {
  state = {
    search: "",
    currentPage: 1,
    openEditProduct: false
  };
  componentDidMount = async () => {
    await this.props.fetchMembers({ name: null });
  };
  render() {
    const { currentPage } = this.state;
    const {
      error,
      loading,
      members: { data, total, skip, take }
    } = this.props;

    return (
      <Layout module="salerManager">
        <MaterialTable
          actions={[
            {
              icon: "edit",
              iconColor: "purple",

              iconProps: { color: "action" },
              tooltip: <FormattedMessage id="edit_product" />,
              onClick: async (event, rowData) => {
                // Do save operation
                // await this.setState({openEditProduct:true})
              }
            },
            {
              icon: "delete",

              iconProps: { color: "error" },
              tooltip: <FormattedMessage id="delete_product" />,
              onClick: (event, rowData) => {}
              // confirm("You want to delete " + rowData.name)
            },
            {
              icon: "add",
              tooltip: <FormattedMessage id="add_product" />,
              iconProps: { color: "primary", fontSize: "large" },
              isFreeAction: true,

              onClick: async (event, rowData) => {
                // Do save operation
                await this.setState({ openEditProduct: true });
              }
            }
          ]}
          totalCount={parseInt(total)}
          page={currentPage - 1}
          rowsPerPage={parseInt(take)}
          onSearchChange={async search => {
            //  if (search.trim().length > 0) {
            await this.setState({ search });
            await this.setState({ currentPage: 1 });
            await this.props.fetchMembers({ name: search });
            // }
          }}
          onChangeRowsPerPage={async page => {
            await this.setState({ currentPage: 1 });
            await this.props.fetchMembers({ take: parseInt(page), skip: 0 });
          }}
          onChangePage={async page => {
            let comingPage = parseInt(page) + 1;

            let skipper = (parseInt(take) - 1) * comingPage;

            await this.setState({ currentPage: comingPage });

            await this.props.fetchMembers({
              skip: skipper,
              take: parseInt(take)
            });
          }}
          title={<FormattedMessage id="products_list" />}
          isLoading={loading}
          columns={columns}
          data={data}
          options={{
            padding: "dense",
            rowStyle: { width: 10, color: "white" },
            filtering: true,
            searchFieldAlignment: "right",

            paginationType: "normal",
            pageSize: parseInt(take),
            pageSizeOptions: [5, 10, 20, 30, 40]
          }}
          localization={{
            pagination: {
              labelDisplayedRows: `{count}`
            },
            toolbar: {
              nRowsSelected: "{0} row(s) selected",
              searchPlaceholder: ""
            },
            header: {
              actions: "Actions"
            },
            body: {
              emptyDataSourceMessage: (
                <FormattedMessage id="no_records_message" />
              ),
              filterRow: {
                filterTooltip: <FormattedMessage id="filter" />
              }
            }
          }}
        />

        <FullModal
          title={"add_product"}
          open={this.state.openEditProduct}
          handleClose={async () => {
            await this.setState({ openEditProduct: false });
          }}
        >
          <CreateProduct
            handleClose={async () => {
              await this.setState({ openEditProduct: false });
            }}
          />
        </FullModal>
      </Layout>
    );
  }
}

const mapDistpathToProps = dispatch => {
  return {
    fetchMembers: query => dispatch(fetchMembers(query))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.members.loading,
    members: state.members.members,
    error: state.members.error || null
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDistpathToProps
  )
)(TeamList);
