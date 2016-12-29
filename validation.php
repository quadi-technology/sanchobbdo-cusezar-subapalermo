<html>

<body>

<?php

$con = mysql_connect("mariadb-139.wc1.ord1.stabletransit.com","1010014_ftpsuba","4XPZQ6dXuVgZZZQZ");
/*$con = mysql_connect("localhost","root","");*/
if (!$con)

  {

  die('Could not connect: ' . mysql_error());

  }


mysql_select_db("1010014_ftpsuba", $con);

 @$name=trim($_POST[fild1]);


$sql="INSERT INTO subapalermo (Name, email, telephone, Mobile) VALUES ('$name','$_POST[fild2]','$_POST[fild3]','$_POST[fild4]')";
/*echo $sql;
exit();
 */

if (!mysql_query($sql,$con))

  {

  die('Error: ' . mysql_error());

mysql_close($con);


  } else {
  
 mysql_close($con); ?>
  <script type="text/javascript">
            window.location.href = "http://subapalermo.cusezar.com.php56-5.ord1-1.websitetestlink.com/?success=true"
            
             /*window.location.href = "http://localhost/sanchobbdo-cusezar-homecalle80/?success=true"*/
        </script>
  <?php
  }



exit();

?>

</body>

</html>