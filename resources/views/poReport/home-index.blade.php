@extends('layouts.index')

@section('breadcrumb')
<div class="card" style="background-color: #f6f7fb;">
    <div class="page-header-breadcrumb" style="padding-top: 0.5rem;">
        <ul class="breadcrumb-title">
            <li class="breadcrumb-item">
                <a href="#!">
                    <i class="icofont icofont-home"></i>
                </a>
            </li>
            <li class="breadcrumb-item">
                <a href="poReport">PO Report</a>
            </li>
        </ul>
    </div>
</div>
@endsection
@section('content')
    <div class="card-block">
        {{-- <div class="dt-responsive table-responsive">
            <table class="m-b-10">
                <tbody>
                    <tr>
                        <td>Start Date:</td>
                        <td>
                            <input class="form-control" type="text" id="min" name="min">
                        </td>
                        <td>End Date</td>
                        <td>
                            <input class="form-control" type="text" id="max" name="max">
                        </td>
                    </tr>
                    </tr>
                </tbody>
            </table>
        </div> --}}
        <div class="dt-responsive table-responsive">
            <div id="dt-range_wrapper" class="dataTables_wrapper dt-bootstrap4">
                <div class="row"><div class="col-xs-12 col-sm-12 col-sm-12 col-md-6">
                    <div class="dataTables_length" id="dt-range_length">
                        <label>Show 
                            <select name="dt-range_length" aria-controls="dt-range" class="form-control input-sm">
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select> 
                            entries
                        </label>
                    </div>
                </div>
            <div class="col-xs-12 col-sm-12 col-md-6">
                <div id="dt-range_filter" class="dataTables_filter">
                    <label>Search:<input type="search" class="form-control input-sm" placeholder="" aria-controls="dt-range"></label>
                </div>
            </div>
        </div>
        <div class="row"><div class="col-xs-12 col-sm-12">
            <table id="dt-range" class="table table-striped table-bordered nowrap dataTable" role="grid" aria-describedby="dt-range_info">
                <thead>
                    <tr role="row">
                        <th class="sorting_asc" tabindex="0" aria-controls="dt-range" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Name: activate to sort column descending" style="width: 105px;">
                            #
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="dt-range" rowspan="1" colspan="1" aria-label="Position: activate to sort column ascending" style="width: 178px;">
                            PO Number
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="dt-range" rowspan="1" colspan="1" aria-label="Office: activate to sort column ascending" style="width: 72px;">
                            PO Reference
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="dt-range" rowspan="1" colspan="1" aria-label="Age: activate to sort column ascending" style="width: 28px;">
                            Customer
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="dt-range" rowspan="1" colspan="1" aria-label="Start date: activate to sort column ascending" style="width: 73px;">
                            Amount
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="dt-range" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 53px;">
                            status
                        </th>
                        <th class="sorting" tabindex="0" aria-controls="dt-range" rowspan="1" colspan="1" aria-label="Salary: activate to sort column ascending" style="width: 53px;">
                            Approved by
                        </th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($poReports as $poReport)
                    <tr role="row" class="odd">
                        <td class="sorting_1"> {{$poReport->po_header_id}}</td>
                        <td>{{$poReport->po_number}}</td>
                        <td>{{$poReport->po_reference}}</td>
                        <td>{{$poReport->supplier_id}}</td>
                        <td>{{$poReport->total_amount}}</td>
                        <td>{{$poReport->status}}</td>
                        <td>{{$poReport->approved_by}}</td>
                    </tr>
                    @endforeach
                    
                </tbody>
                <tfoot>
                    <tr><th rowspan="1" colspan="1">Name</th><th rowspan="1" colspan="1">Position</th><th rowspan="1" colspan="1">Office</th><th rowspan="1" colspan="1">Age</th><th rowspan="1" colspan="1">Start date</th><th rowspan="1" colspan="1">Salary</th></tr>
                </tfoot>
            </table></div></div><div class="row"><div class="col-xs-12 col-sm-12 col-md-5"><div class="dataTables_info" id="dt-range_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div><div class="col-xs-12 col-sm-12 col-md-7"><div class="dataTables_paginate paging_simple_numbers" id="dt-range_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="dt-range_previous"><a href="#" aria-controls="dt-range" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li><li class="paginate_button page-item active"><a href="#" aria-controls="dt-range" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item "><a href="#" aria-controls="dt-range" data-dt-idx="2" tabindex="0" class="page-link">2</a></li><li class="paginate_button page-item "><a href="#" aria-controls="dt-range" data-dt-idx="3" tabindex="0" class="page-link">3</a></li><li class="paginate_button page-item "><a href="#" aria-controls="dt-range" data-dt-idx="4" tabindex="0" class="page-link">4</a></li><li class="paginate_button page-item "><a href="#" aria-controls="dt-range" data-dt-idx="5" tabindex="0" class="page-link">5</a></li><li class="paginate_button page-item "><a href="#" aria-controls="dt-range" data-dt-idx="6" tabindex="0" class="page-link">6</a></li><li class="paginate_button page-item next" id="dt-range_next"><a href="#" aria-controls="dt-range" data-dt-idx="7" tabindex="0" class="page-link">Next</a></li></ul></div></div></div></div>
        </div>
    </div>
@endsection