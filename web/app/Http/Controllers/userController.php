<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\userData;
class userController extends Controller
{
    public function index(){
        return response()->json([
            "status"=>"okay.."
        ]);
    }
    public function showData(){
        $users = userData::all()->toArray();
        if(count($users) ===0){
            return response()->json([
                "status"=>false,
            ],200);
        }
        return response()->json([
            "status"=>true,
            'users'=>(array)$users
        ],200);
    }
}
