<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
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
</style>


@php
$supplier = $supplier[$po_header['supplier_id']]['supplier'];
$requested_by = $users[$po_header['requested_by']];
$canvassed_by = $users[$po_header['canvassed_by']];
$approved_by = $users[$po_header['approved_by']];
@endphp

<body>
    <div class="center">
        <h3 class="text-wrapper">WARLEN INDUSTRIAL SALES CORPORATION</h3 >
        <p class="text-wrapper text-small">Deka Bldg. Blk. 2 lot 20 Greenplains, Alijis, Bacolod City, Negros Occidental</p>
        <h3 class="text-wrapper">Purchased Order</h3 >
        <div id="info-one" >
            <b>Supplier:</b>&nbsp;&nbsp;<p id="supplier" class="pad-right underline unpad" style="display:inline-block">{{$supplier}}</p>
            <b>P.O.#:</b>&nbsp;&nbsp;<p id="po-number" class="underline unpad" style="display:inline-block">{{$po_header['po_number']}}</p>
        </div>
        <div id="info-two" >
            <b>Address:</b>&nbsp;&nbsp;<p id="supplier" class="pad-right underline unpad" style="display:inline-block">{{$po_header['supplier_address']}}</p>
            <b>Date:</b>&nbsp;&nbsp;<p id="po-number" class="underline unpad" style="display:inline-block">{{$po_header['date']}}</p>
        </div>
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
                    <td>{{$detail['quantity']}}</td>
                    <td>{{$detail['unit']}}</td>
                    <td>{{$detail['item']}}</td>
                    <td>{{$detail['brand']}}</td>
                    <td>{{$detail['model']}}</td>
                    <td>{{$detail['per_unit']}}</td>
                    <td>{{$detail['price']}}</td>
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
                    <td>{{$po_header['total_amount']}}</td>
                </tr>
                @if($po_header['payment_type'] == 'H')
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


