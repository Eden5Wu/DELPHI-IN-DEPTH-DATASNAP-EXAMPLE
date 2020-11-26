<?php
include_once 'conn.php';

$itemid = mysql_real_escape_string($_REQUEST['itemid']);

$rs = mysql_query("select * from item where itemid='$itemid'");
$item = mysql_fetch_array($rs);
?>
<style type="text/css">
	.dv-table td{
		border:0;
	}
	.dv-label{
		font-weight:bold;
		color:#15428B;
		width:100px;
	}
</style>

<table class="dv-table" border="0" style="width:100%;">
	<tr>
		<td rowspan="3" style="width:60px">
			<?php
				$aa = explode('-',$itemid);
				$serno = $aa[1];
				$img = "images/shirt$serno.gif";
				echo "<img src=\"$img\" style=\"width:60px;margin-right:20px\" />";
			?>
		</td>
		<td class="dv-label">Item ID: </td>
		<td><?php echo $item['itemid'];?></td>
		<td class="dv-label">Product ID:</td>
		<td><?php echo $item['productid'];?></td>
	</tr>
	<tr>
		<td class="dv-label">List Price: </td>
		<td><?php echo $item['listprice'];?></td>
		<td class="dv-label">Unit Cost:</td>
		<td><?php echo $item['unitcost'];?></td>
	</tr>
	<tr>
		<td class="dv-label">Attribute: </td>
		<td colspan="3"><?php echo $item['attr1'];?></td>
	</tr>
</table>

