@extends('layouts.index')

@section('breadcrumb')
<div class="page-header-breadcrumb" style="padding-top: 0.5rem;">
    <ul class="breadcrumb-title">
        <li class="breadcrumb-item">
            <a href="#!">
                <i class="icofont icofont-home"></i>
            </a>
        </li>
        <li class="breadcrumb-item">
            <a href="#!">PO Number</a>
        </li>
    </ul>
</div>
@endsection
@section('content')
    <div id='poNumber'>
       
    </div>
@endsection
@section('scripts')
<script>
 $(function() {
    $('#master-data').addClass('pcoded-trigger')
    $('#po-number-menu').addClass('active')
});
</script>
@endsection