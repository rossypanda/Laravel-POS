<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use App\Http\Resources\PoReportResource;
use App\DataTables\PoReportDataTable;
use App\Models\PurchaseOrder;
use App\Models\User;
use App\Models\Supplier;
use App\Models\PODetail;


class PoReportController extends Controller
{
    public const PER_PAGE               = 10; 
    public const DEFAULT_SORT_FIELD     = 'created_at'; 
    public const DEFAULT_SORT_ORDER     = 'asc'; 

    /**
     *
     * @var  string[]
     */ 

    protected array $sortFields = ['po_reference'];

    /**
     *
     * @param  PurchaseOrder $pOrder
     */

    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(PoReportDataTable $dataTables)
    {
        $poReports = PurchaseOrder::all();
        return view('poReport.home-index',  ['poReports' => $poReports]);

        // return $dataTables->render('poReport.home-index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function generatePoReport(Request $request): AnonymousResourceCollection
    {
        // $users = $this->user->all();
        $po = PurchaseOrder::paginate(10);

        $sortFieldInput = $request->input('sort_field', self::DEFAULT_SORT_FIELD);
        $sortField      = in_array($sortFieldInput, $this->sortFields) ? $sortFieldInput : self::DEFAULT_SORT_FIELD;
        $sortOrder      = $request->input('sort_order', self::DEFAULT_SORT_ORDER);
        $searchInput    = $request->input('search');
        $query          = $this->user->orderBy($sortField, $sortOrder);
        $perPage        = $request->input('per_page') ?? self::PER_PAGE;
        if (!is_null($searchInput)) {
            $searchQuery = "%$searchInput%";
            $query       = $query->where('name', 'like', $searchQuery)->orWhere('email', 'like', $searchQuery)->orWhere('address','like',$searchQuery);
        }
        $po = $query->paginate((int)$perPage);
        

        return PoReportResource::collection($po);
    }
}
