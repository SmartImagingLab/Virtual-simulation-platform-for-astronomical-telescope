/* 操作记录 */
/*实验室设备管理*/

var Main = {
    data() {
        return {
            allData:[],
            tableData: [],
            total: "",
            pageSize: 15,
            currentPage: 1,
            pageCount: "",
        }
    },
    mounted: function(){
        var self=this;
        setTimeout(function(){
            self.getDate();
            console.log(1)

        },100)


    },
    methods: {
        tableRowClassName: function({ row, rowIndex }) {
            if (rowIndex % 2 === 0) {
                return 'td even';
            } else {
                return 'td odd';
            }
        },
        getHeaderRowClass: function({ row, rowIndex }) {
            return 'table-head-th';
        },
        getDate:function(){
            var _self=this;
            $.ajax({
                type: "get",
                url: "/ashx/shiyanjiluHandler.ashx",
                async: false,
                dataType: 'json',
                success: function(res) {
                    _self.allData = res;
                    _self.total=_self.allData.length;
                    _self.tableData = _self.allData.slice(0, _self.pageSize);
                    _self.currentPage = 1;
                    _self.pageCount = Math.ceil(_self.total / _self.pageSize);
                    $("#loading").hide();
                    $("#showTable").show();
                },
                error: function(event) {
                    console.log(event.status);
                }
            });
        },
        firstPage: function() {
            this.currentPage = 1;
            this.currentChange(this.currentPage);
        },
        prevPage: function() {
            this.currentPage--;
            this.currentChange(this.currentPage);
        },
        nextPage: function() {
            this.currentPage++;
            this.currentChange(this.currentPage);
        },
        lastPage: function() {
            this.currentPage = this.pageCount;
            this.currentChange(this.currentPage);
        },
        currentChange: function(page) {
            if (page <= 1) {
                this.currentPage = 1;
                this.tableData = this.allData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
            } else if (page >= this.pageCount) {
                this.currentPage = this.pageCount;
                this.tableData = this.allData.slice((this.pageCount - 1) * this.pageSize);
            } else {
                this.tableData = this.allData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
            }
        }

    },
};
var Ctor = Vue.extend(Main);
new Ctor().$mount('.empirical');
