<nav class="pcoded-navbar">
    <div class="pcoded-inner-navbar main-menu">
        <div class="pcoded-navigatio-lavel">Navigation</div>
        <ul class="pcoded-item pcoded-left-item">
            <li id="master-data" class="pcoded-hasmenu">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon"><i class="feather icon-home"></i></span>
                    <span class="pcoded-mtext">Master Data</span>
                </a>
                <ul class="pcoded-submenu">
                    <li id="supplier-menu">
                        <a href="/supplier">
                            <span  class="pcoded-mtext">Supplier</span>
                        </a>
                    </li>
                    @role('admin')
                    <li id="po-number-menu">
                        <a href="/poNumber">
                            <span class="pcoded-mtext">PO Number</span>
                        </a>
                    </li>
                    @endrole
                </ul>
            </li>
            <li id="transaction" class="pcoded-hasmenu">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon"><i class="feather icon-server"></i></span>
                    <span class="pcoded-mtext">Transaction</span>
                    {{-- <span class="pcoded-badge label label-warning">NEW</span> --}}
                </a>
                <ul class="pcoded-submenu">
                    <li id="po-menu" class=" ">
                        <a href="/purchaseOrder">
                            <span class="pcoded-mtext">Purchase Order</span>
                        </a>
                    </li>
                    <li id="create-po-menu" class=" ">
                        <a href="/create/purchase_order">
                            <span class="pcoded-mtext">Create Purchase Order</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li id="report" class="pcoded-hasmenu">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon"><i class="feather icon-layers"></i></span>
                    <span class="pcoded-mtext">Report</span>
                    {{-- <span class="pcoded-badge label label-danger">100+</span> --}}
                </a>
                <ul class="pcoded-submenu">
                    <li id="po-report-menu" class=" ">
                        <a href="/poReport">
                            <span class="pcoded-mtext">Purchase Order Report</span>
                        </a>
                    </li>

                </ul>
            </li>

            @role('admin')
            <li class="pcoded-hasmenu" dropdown-icon="style1" subitem-icon="style1">
                <a href="javascript:void(0)">
                    <span class="pcoded-micon"><i class="feather icon-unlock"></i></span>
                    <span class="pcoded-mtext">Admin</span>
                </a>
                <ul class="pcoded-submenu">
                    <li class="">
                        <a href="/permissions" target="_blank">
                            <span class="pcoded-mtext">Permission</span>
                        </a>
                    </li>
                    
                    <li class="">
                        <a href="/user" >
                            <span class="pcoded-mtext">User</span>
                        </a>
                    </li>

                    <li class="">
                        <a href="/reset" >
                            <span class="pcoded-mtext">Reset</span>
                        </a>
                    </li>
                    
                </ul>
            </li>
            @endrole
     

            

            <li class="">
                <a  href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    <span class="pcoded-micon"><i class="feather icon-log-out"></i></span>
                    <span class="pcoded-mtext">Log out</span>
                </a>

                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                    @csrf
                </form> 
                
            </li>
            
        </ul>
    </div>
</nav>