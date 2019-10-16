import React, { Component } from "react";
import Layout from "../common/layout";
import { compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { fetchCats } from "../../store/actions/category";
import MaterialTable from "material-table";
import FullModal from "../../components/FullModal";
import CreateProduct from "../../components/CreateProduct";

const columns = [
  {
    field: "name",
    title: <FormattedMessage id="name" />,

    render: rowData => <span>{rowData.name}</span>
  }
];

class CategoryList extends Component {
  state = {
    search: "",
    currentPage: 1,
    openEditProduct: false
  };
  componentDidMount = async () => {
    await this.props.fetchCategories({ name: null });
  };
  render() {
    const { currentPage } = this.state;
    const {
      error,
      loading,
      categories: { data, total, skip, take }
    } = this.props;

    return (
      <Layout module="salerManager">
        <MaterialTable
          title={<FormattedMessage id="categories_list" />}
          actions={[
            {
              icon: "edit",
              iconColor: "purple",

              iconProps: { color: "action" },
              tooltip: <FormattedMessage id="edit_category" />,
              onClick: async (event, rowData) => {
                // Do save operation
                // await this.setState({openEditProduct:true})
              }
            },
            {
              icon: "delete",

              iconProps: { color: "error" },
              tooltip: <FormattedMessage id="delete_category" />,
              onClick: (event, rowData) => {}
              // confirm("You want to delete " + rowData.name)
            },
            {
              icon: "add",
              tooltip: <FormattedMessage id="add_category" />,
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
            await this.props.fetchCategories({ name: search });
            // }
          }}
          onChangeRowsPerPage={async page => {
            await this.setState({ currentPage: 1 });
            await this.props.fetchCategories({ take: parseInt(page), skip: 0 });
          }}
          onChangePage={async page => {
            let comingPage = parseInt(page) + 1;

            let skipper = (parseInt(take) - 1) * comingPage;

            await this.setState({ currentPage: comingPage });

            await this.props.fetchCategories({
              skip: skipper,
              take: parseInt(take)
            });
          }}
          isLoading={loading}
          columns={columns}
          data={data}
          options={{
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
          title={"add_category"}
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
    fetchCategories: query => dispatch(fetchCats(query))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.categories.loading,
    categories: state.categories.categories,
    error: state.categories.error || null
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDistpathToProps
  )
)(CategoryList);
