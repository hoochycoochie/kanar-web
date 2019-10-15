import React, { Component } from "react";
import Layout from "../common/layout";
import { compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { fetchProducts } from "../../store/actions/product";
import MaterialTable from "material-table";

class ProductListWorker extends Component {
  state = {
    search: "",
    currentPage: 1
  };
  componentDidMount = async () => {
    await this.props.fetchProducts({ name: null });
  };
  render() {
    const columns = [
      {
        title: "",
        field: "picture",
        sorting: false,
        filtering: false,
        render: rowData => (
          <img
            style={{ height: 36, borderRadius: "50%" }}
            src={rowData.picture}
          />
        )
      },
      { field: "name", title: <FormattedMessage id="name" /> },
      {
        field: "reference",
        title: <FormattedMessage id="ref" />
      },

      {
        field: "price",

        title: <FormattedMessage id="price" />,
        type: "numeric"
      }
    ];
    const { currentPage } = this.state;
    const {
      error,
      loading,
      products: { data, total, skip, take }
    } = this.props;

    return (
      <Layout module="salerWorker">
        <MaterialTable
          totalCount={parseInt(total)}
          page={currentPage - 1}
          rowsPerPage={parseInt(take)}
          onSearchChange={async search => {
            await this.setState({ search });
            await this.setState({ currentPage: 1 });
            await this.props.fetchProducts({ name: search });
          }}
          onChangeRowsPerPage={async page => {
            await this.setState({ currentPage: 1 });
            await this.props.fetchProducts({ take: parseInt(page), skip: 0 });
          }}
          onChangePage={async page => {
            let comingPage = parseInt(page) + 1;
            console.log("comingPage", comingPage);
            let skipper = (parseInt(take) - 1) * comingPage;

            // if (comingPage > currentPage) {
            //   skipper = (parseInt(take) - 1) * comingPage;
            // }
            await this.setState({ currentPage: comingPage });

            await this.props.fetchProducts({
              skip: skipper,
              take: parseInt(take)
            });
          }}
          title={<FormattedMessage id="products_list" />}
          isLoading={loading}
          columns={columns}
          data={data}
          options={{
            filtering: true,
            searchFieldAlignment: "left",
            paginationType: "normal",
            pageSize: parseInt(take),
            pageSizeOptions: [10, 20, 30, 40]
          }}
          localization={{
            pagination: {
              labelDisplayedRows: `{from}-{to}  {count}`
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
      </Layout>
    );
  }
}

const mapDistpathToProps = dispatch => {
  return {
    fetchProducts: query => dispatch(fetchProducts(query))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.products.loading,
    products: state.products.products,
    error: state.products.error || null
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDistpathToProps
  )
)(ProductListWorker);
