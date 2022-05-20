<?php
	require_once("db_connection.php");
	class Image {
    
	    var $file;
	    var $image_width;
	    var $image_height;
	    var $width;
	    var $height;
	    var $ext;
	    var $types = array('gif','jpeg','png','swf');
	    var $quality = 50;
	    var $top = 0;
	    var $left = 0;
	    var $crop = false;
	    var $type;
	    
	    function Image($name='') {
	        $this->file = $name;
	        $info = getimagesize($name);
	        $this->image_width = $info[0]/10;
	        $this->image_height = $info[1]/10;
	        $this->type = $this->types[$info[2]];
	        $info = pathinfo($name);
	        $this->dir = $info['dirname'];
	        $this->name = str_replace('.'.$info['extension'], '', $info['basename']);
	        $this->ext = $info['extension'];
	    }
	    
	    function dir($dir='') {
	        if(!$dir) return $this->dir;
	        $this->dir = $dir;
	    }
	    
	    function name($name='') {
	        if(!$name) return $this->name;
	        $this->name = $name;
	    }
	    
	    function width($width='') {
	        $this->width = $width;
	    }
	    
	    function height($height='') {
	        $this->height = $height;
	    }
	    
	    function resize($percentage=50) {
	        if($this->crop) {
	            $this->crop = false;
	            $this->width = round($this->width*($percentage/100));
	            $this->height = round($this->height*($percentage/100));
	            $this->image_width = round($this->width/($percentage/100));
	            $this->image_height = round($this->height/($percentage/100));
	        } else {
	            $this->width = round($this->image_width*($percentage/100));
	            $this->height = round($this->image_height*($percentage/100));
	        }
	        
	    }
	    
	    function crop($top=0, $left=0) {
	        $this->crop = true;
	        $this->top = $top;
	        $this->left = $left;
	    }
	    
	    function quality($quality=80) {
	        $this->quality = $quality;
	    }
	    
	    function show() {
	        $this->save(true);
	    }
	    
	    function save($show=false) {
	 
	        if($show) @header('Content-Type: image/'.$this->type);
	        
	        // if(!$this->width && !$this->height) {
	        //     $this->width = $this->image_width;
	        //     $this->height = $this->image_height;
	        // } elseif (is_numeric($this->width) && empty($this->height)) {
	        //     $this->height = round($this->width/($this->image_width/$this->image_height));
	        // } elseif (is_numeric($this->height) && empty($this->width)) {
	        //     $this->width = round($this->height/($this->image_height/$this->image_width));
	        // } else {
	        //     if($this->width<=$this->height) {
	        //         $height = round($this->width/($this->image_width/$this->image_height));
	        //         if($height!=$this->height) {
	        //             $percentage = ($this->image_height*100)/$height;
	        //             $this->image_height = round($this->height*($percentage/100));
	        //         }
	        //     } else {
	        //         $width = round($this->height/($this->image_height/$this->image_width));
	        //         if($width!=$this->width) {
	        //             $percentage = ($this->image_width*100)/$width;
	        //             $this->image_width = round($this->width*($percentage/100));
	        //         }

	        //        $this->crop = true;
	        //     }
	        // }
	        
	        if($this->crop) {
	        	$this->crop = false;
	            $this->image_width = $this->width;
	            $this->image_height = $this->height;
	        }

	        $exif = exif_read_data($this->file);//<get exif data. jpeg 나 tiff 의 경우에만 갖고 있음

	        if($this->type=='jpeg') $image = imagecreatefromjpeg($this->file);
	        if($this->type=='png') $image = imagecreatefrompng($this->file);
	        if($this->type=='gif') $image = imagecreatefromgif($this->file);

	        //값에 따라 회전
		    switch($exif['Orientation']){
		        case 8 : $image = imagerotate($image,90,0); break;
		        case 3 : $image = imagerotate($image,180,0); break;
		        case 6 : $image = imagerotate($image,-90,0); break;
		    }

		    $width  = imagesx($image);
			$height = imagesy($image);
			
	        $new_image = imagecreatetruecolor($width, $height);
	        imagecopyresampled($new_image, $image, 0, 0, $this->top, $this->left, $width, $height, $width, $height);
	        
	        $name = $show ? null: $this->dir.DIRECTORY_SEPARATOR.$this->name.'.'.$this->ext;
	    
	        if($this->type=='jpeg') imagejpeg($new_image, $name, $this->quality);
	        if($this->type=='png') imagepng($new_image, $name);
	        if($this->type=='gif') imagegif($new_image, $name);

	        imagedestroy($image); 
	        imagedestroy($new_image);
	    }
	    
	}
  
 
/*  사용방법
$re_image = new Image(이미지 파일명);
$re_image -> width(200);
$re_image -> height(300);
$re_image -> save();
*/
	
	$user_id = $_REQUEST["user_id"];
	$albumid = $_REQUEST["albumid"];
	$contents_id = $_REQUEST["contents_id"];
	$type = $_REQUEST["type"];
	$contents = $_REQUEST["contents"];
	$path;
	if($type=="profile") $path="/home/soundgram/media/user/$user_id/";
	// else if($type=="video") $path="/home/soundgram/media/video/$user_id/";
	// else if($type=="review") $path="/home/soundgram/media/meta/None/reply/";
	else $path="/home/soundgram/media/comment/$albumid/";
	
	if(isset($_FILES)) {
		//$connect = mysql_connect("localhost:9000","root","1tkddydwkdql") or die(mysql_error());
		//mysql에서는 db를 반드시 선택해야한다.
		//mysql_select_db("soundgramR2") or die("can't find db");
		//폰트에 대한 초기 세팅 모두 utf8로 바꿔준다.
		//sql_query("set names utf8");
		// DB에서 가져올 때 하는 명령어는 select이다.
		// Select 필드명(테이블에 있는 모든 필드를 가져올때는*) from 테이블명

		$file_name = $_FILES["file"]["name"]==""?"-":$_FILES["file"]["name"];
		if($file_name=="-") {
			$insertQuery1;
			$contents_type;
			if($type=="video") {
				$contents_type = "4";
			}
			else {
				$contents_type = "6";
			}

			$insertQuery1 
				= " INSERT INTO APIServer_user_comment(timestamp, comment, user_id, album_id, contents_type, contents_id, like_count) VALUES(NOW(), '$contents', '$user_id', '$albumid', '$contents_type', '$contents_id', '0')";
			
			$result = sql_query($insertQuery1);
			if($result>0) {
				$JSON = array(
		  			"returnCode" => "success"
		  		);

			  	echo json_encode($JSON);
			}
		}
		else {
			list($txt, $ext) = explode(".", $file_name);
			$actual_image_name = date("Y-m-d")."-".time().".".$ext;
			$tmp = $_FILES["file"]["tmp_name"];

			if(!is_dir($path)) {
				mkdir($path);
			}

			if(!chmod($path, 0777) ) {
				chmod($path, 0777);
			}
			if(move_uploaded_file($tmp, $path.$actual_image_name))
	        {       
	        	// image resize
	        	$re_image = new Image($path.$actual_image_name);
				chmod($path.$actual_image_name, 0777);
				// $re_image -> width(500);
				// $re_image -> height(500);
				$re_image -> save();

				if($type=="profile") {
					// $dir = "user/$user_id/$actual_image_name";
					$profileUpdateQuery = "update APIServer_user set user_img='$actual_image_name' where id='$user_id'";
					$update_result = sql_query($profileUpdateQuery);
					if($update_result>0) {
						$JSON = array(
				  			"returnCode" => "success",
				  			"profile" => $actual_image_name
				  		);

					  	echo json_encode($JSON);
					}
					else {
						$JSON = array(
							"returnCode" => "fail"
						);

						echo json_encode($JSON);
					}
				}
				else {
					$insertQuery1;
					$contents_type;
					if($type=="video") {
						// $dir = "video/$user_id/$actual_image_name";
						$contents_type = "4";
					}
					else {
						// $dir = "meta/None/reply/$actual_image_name";
						$contents_type = "6";
						// if(!is_numeric($contents_id)) {
						// 	$selreviewid = "	select id from APIServer_review where album_id='$albumid'	";
						// 	$result = sql_query($selreviewid);
						// 	$contents_id = $result->num_rows;
						// }
					}

					$insertQuery1 
						= " INSERT INTO APIServer_user_comment(timestamp, comment, comment_img, user_id, album_id, contents_type, contents_id, like_count) VALUES(NOW(), '$contents', '$actual_image_name', '$user_id', '$albumid', '$contents_type', '$contents_id', '0')";
					
					$result = sql_query($insertQuery1);
					if($result>0) {
						$JSON = array(
				  			"returnCode" => "success"
				  		);

					  	echo json_encode($JSON);
					}
				}
			}
			else {
				$JSON = array(
					"returnCode" => "fail",
					"returnMsg" => $path.$actual_image_name
				);

				echo json_encode($JSON);
			}
		}
	}
?>
