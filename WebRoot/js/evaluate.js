/* 操作记录 */
/*实验室设备管理*/
var Main = {
    data() {
        return {
            allData: [],
            tableData: [],
            total: "",
            currentPage: 1,
            pageSize: 6,
            pageCount: "",
            boardForm: {
                question: "",
                nickname: "",
            },
            showReplyDialog: false,
            replyObj: {
                id: "",
                replynickname: "",
                reply: ""
            }


        }
    },
    computed: {

    },
    mounted: function() {
        this.getwordsListHandler();
        this.tableData = this.allData.slice(0, this.pageSize);
        this.currentPage = 1;
        this.pageCount = Math.ceil(this.total / this.pageSize);

    },
    methods: {

        getwordsListHandler: function() {
            var _self = this;
            $.ajax({
                type: "get",
                url: "/ashx/wordsListHandler.ashx",
                async: false,
                dataType: 'json',
                success: function(res) {
                    _self.total = res.length;
                    _self.allData = res;
                },
                error: function(event) {
                    console.log(event.status);
                }
            });
        },
        addwordsHandler: function() {
            var _self = this;
            $.ajax({
                type: "POST",
                url: "/ashx/addwordsHandler.ashx",
                data: _self.boardForm,
                async: false,
                success: function(res) {
                    _self.getwordsListHandler();
                    _self.tableData = _self.allData.slice(0, _self.pageSize);
                    _self.boardForm = {};
                },
                error: function(event) {
                    console.log(event.status);
                }
            });
        },
        reply: function(id) {
            this.showReplyDialog = true;
            this.replyObj.id = id;

        },
        sureReply: function() {
            var _self = this;
            $.ajax({
                type: "POST",
                url: "/ashx/wordsReplyHandler.ashx",
                data: _self.replyObj,
                async: false,
                success: function(res) {
                    _self.getwordsListHandler();
                    _self.currentChange(_self.currentPage);
                    _self.replyObj = {};
                    _self.showReplyDialog = false;
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
new Ctor().$mount('.evaluate');