<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\userData;

class user_data extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for($i=0;$i<=10;$i++){
            userData::create([
                'name'=>$faker->name(),
                'email'=>$faker->email,
                'phone'=>$faker->phoneNumber,
                'city'=>$faker->city,
            ]);
        }
    }
}
