<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>

    body{
        margin: 0;
        padding: 0;
    }
  .center {
  margin: auto;
  /* width: 50%; */
  /* border: 3px solid green; */
  padding: 10px;
  
}
.text-wrapper{
   padding: 0 !important;
   margin: 0 !important;
   text-align: center;
}

.text-small{
    font-size:0.6rem;
}

.field-text{
    display: inline-block;
    font-weight: bold;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size:0.8rem;
  empty-cells: inherit;
}

td, th {
  border: 1px solid black;
  text-align: center;
  /* padding: 8px; */
}

.underline{
    border-bottom: 1px solid black;
}

.pad-right{
   padding-right: 5rem;
}

.unpad{
    padding-top: 0;
    padding-bottom: 0;
    margin:0;
}

.watermark {
    position: absolute;
    opacity: 0.25;
    font-size: 7rem;
    width: 100%;
    text-align: center;
    z-index: 1000;
    left:0;
    right:-150px;
    margin-left: auto;
    margin-right: auto;
    transform: rotate(-12deg);
}


p#address{
    position: absolute;
    padding-right: 23rem;
    /* border-bottom: 1px solid black; */
}

p#supplier {
    position: absolute;
    padding-right: 20rem;
    /* border-bottom: 1px solid black; */
}

b#po-field {
    padding-left: 30rem;
}



b#date-field {
    padding-left: 30rem;
}
</style>


@php
$supplier = $supplier[$po_header['supplier_id']]['supplier'];
$requested_by = $po_header['requested_by'];
$canvassed_by = $po_header['canvassed_by'];
$approved_by = $po_header['approved_by'] ? $users[$po_header['approved_by']] : '' ;
$total_amount = 0;
foreach($po_detail as $detail){
    if($detail['status'] == 0){
        $total_amount = $total_amount + ($detail['quantity'] * $detail['per_unit']);
    }
}
@endphp

<body>
    <div class="center">
        <h3 class="text-wrapper">WARLEN INDUSTRIAL SALES CORPORATION</h3 >
        <p class="text-wrapper text-small">Deka Bldg. Blk. 2 lot 20 Greenplains, Alijis, Bacolod City, Negros Occidental</p>
        <h3 class="text-wrapper">Purchased Order</h3 >
        <div id="info-one" >
            <b id="supplier-field">Supplier:</b>&nbsp;&nbsp;<p id="supplier" class="unpad" style="display:inline-block">{{$supplier}}</p>
            <b id="po-field">P.O.#:</b>&nbsp;&nbsp;<p id="po-number" class="unpad" style="display:inline-block">{{$po_header['po_number']}}</p>
        </div>
        <div id="info-two" >
            <b id="address-field">Address:</b>&nbsp;&nbsp;<p id="address" class="unpad" style="display:inline-block">{{$po_header['supplier_address']}}</p>
            <b id="date-field">Date:</b>&nbsp;&nbsp;<p id="date" class="unpad" style="display:inline-block">{{$po_header['date']}}</p>
        </div>
        @if($po_header['status'] == 'A')
        <div class="watermark">APPROVED</div>
        @elseif($po_header['status'] == 'C')
        <div class="watermark" style="color:red;">CANCELLED</div>
        @endif
        <div id="asdasd" style="clear: both; margin-top:1rem;">
            <table>
                <tr>
                  <th>QTY</th>
                  <th>Unit</th>
                  <th>Item Description</th>
                  <th>Brand/Origin</th>
                  <th>Model</th>
                  <th>Per Unit</th>
                  <th>Total Amount</th>
                </tr>
                @foreach ($po_detail as $detail)
                <tr>
                    <td style={{$detail['status'] != 0 ? 'color:red' : 'color:black'}}>{{$detail['quantity']}}</td>
                    <td style={{$detail['status'] != 0 ? 'color:red' : 'color:black'}}>{{$detail['unit']}}</td>
                    <td style={{$detail['status'] != 0 ? 'color:red' : 'color:black'}}>{{$detail['item']}}</td>
                    <td style={{$detail['status'] != 0 ? 'color:red' : 'color:black'}}>{{$detail['brand']}}</td>
                    <td style={{$detail['status'] != 0 ? 'color:red' : 'color:black'}}>{{$detail['model']}}</td>
                    <td style={{$detail['status'] != 0 ? 'color:red' : 'color:black'}}>{{$detail['per_unit']}}</td>
                    @if($detail['status'] == 0)
                        <td style={{$detail['status'] != 0 ? 'color:red' : 'color:black'}}>{{$detail['quantity'] * $detail['per_unit']}}</td>
                    @endif
                </tr>
                @endforeach
                <tr>
                    <td style="color:white;"> Spacer </td>
                    <td style="color:white;"> Spacer </td>
                    <td style="color:white;"> Spacer </td>
                    <td style="color:white;"> Spacer </td>
                    <td style="color:white;"> Spacer </td>
                    <td style="color:white;"> Spacer </td>
                    <td style="color:white;"> Spacer </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td  style="text-align: right !important"><b>Grand Total:</b></td>
                    <td>{{$total_amount}}</td>
                </tr>
                @if($po_header['payment_type'] == 'H' || $po_header['payment_type'] == 'A' )
                    <tr>
                        <th>Terms</th>
                        <th colspan="2">Description</th>
                        <th>Due Date</th>
                        <th>Type of Bank</th>
                        <th>%</th>
                        <th>Amount</th>
                    </tr>
                    @foreach($terms as $term)
                        <tr>
                            <td>{{$term->terms}}</td>
                            <td colspan="2">{{$term->terms_description}}</td>
                            <td>{{$term->terms_due}}</td>
                            <td>{{$term->terms_bank}}</td>
                            <td>{{$term->terms_percent}}</td>
                            <td>{{$term->terms_amount}}</td>
                        </tr>
                    @endforeach
                @endif
                <tr>
                    <th colspan="1"> Project Name: </td>
                    <th colspan="6" style="text-align: left !important"> {{$po_header['project_name']}} </td>
                </tr>
                <tr>
                    <th colspan="2"> Requested by: </td>
                    <th colspan="3"> Canvassed and Prepared by: </td>
                    <th colspan="2"> Approved by: </td>
                </tr>
                <tr>
                    <td colspan="2">{{$requested_by}}</td>
                    <td colspan="3">{{$canvassed_by}}</td>
                    <td colspan="2">{{$approved_by}}</td>
                </tr>
                <tr>
                    <th colspan="2"> Project In-charge </td>
                    <th colspan="3"> Purchaser </td>
                    <th colspan="2"> Manager/Authorized Representative </td>
                </tr>
            </table>
       
              
        </div>
    </div>
</body>
</html>


