<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\userData;
class userController 
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
    public function deleteUser(Request $request){
        $session = $request->get('shopifySession');
        $shop = $session->getShop();
        if($shop){
            $id = $request->id;
            if(userData::where("id",$id)->exists()){
                $user = userData::find($id);
                $user->delete();
                return response()->json([
                    "status"=>true,
                    "message"=>"user deleted with Id {$id}."
                ]);
            }
            return response()->json([
                "status"=>false,
                "message"=>"user is not found with id {$id}."
            ]);
        }
        return "You are not authorized to perform this task.";
       
        // if($id){
        //     return response()->json([
        //         "status"=>true,
        //         "message"=>"Data deleted..",
        //         "id"=>$id
        //     ]);
        // }
        // return response()->json([
        //     "status"=>false,
        //     "message"=>"Data not deleted.."
        // ]);
        
        // return "okay";
    }

    public function addUser(Request $request){
        $session = $request->get('shopifySession');
        $shop = $session->getShop();
        if($shop){
            $user = new userData;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->city = $request->city;
        $user->save();
        if(empty($user)){
            return response()->json([
                "status"=>false,
                "message"=>"user not added.Please try again later."
            ],404);
        }
        return response()->json([
            "status"=>true,
            "message"=>"User added successfully..",
            "user"=>$user
        ],201);
        }
        return response()->json([
            "status"=>false,
            "message"=>"something went wrong.."
        ],500);
        
    }
    public function getUser(Request $request){
        $session = $request->get('shopifySession');
        $shop = $session->getShop();
        if($shop){
            $id = $request->id;
            if(userData::where("id",$id)->exists()){
                $user = userData::find($id);
                return response()->json([
                    "status"=>true,
                    "message"=>"user Data",
                    "user"=>$user
                ]);
            }
            return response()->json([
                "status"=>false,
                "message"=>"user is not found with id {$id}."
            ]);
        }
        return "You are not authorized to perform this task.";
    }

    public function editUser(Request $request){
        $session = $request->get('shopifySession');
        $shop = $session->getShop();
        if($shop){
            $id = $request->id;
            $user = userData::find($id);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->phone = $request->phone;
            $user->city = $request->city;
            $user->save();

            if($user){
                return response()->json([
                    "status"=>true,
                    "message"=>"user updated successfully."
                ]);
            }
            return response()->json([
                "status"=>false,
                "message"=>"user not updated.."
            ]);
        }   
        return response()->json([
            "status"=>false,
            "message"=>"something went wrong."
        ]);
    }
}
