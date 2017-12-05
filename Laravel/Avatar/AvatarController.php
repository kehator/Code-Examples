<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\UserProfile;

use App\Avatar;

use App\User;

use Auth;

use Storage;

use Session;


class AvatarController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the avatars.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new avatar.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created avatar in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ( $request->file('avatar')->getClientMimeType() === 'image/svg+xml' ) {
            $this->validate($request, [
                'avatar' => 'required|max:512',
            ]);
        } else {            
            $this->validate($request, [
                'avatar' => 'required|image|max:512|dimensions:max_width=256,max_height=256',
            ]);
        }

        $id = Auth::user()->id;
        $user = User::find($id);

        //$avatar = preg_replace('/\xA0/u',' ',trim( $request->file('avatar')->getClientOriginalName(), '\xC2\n' ));
        $avatar_name = preg_replace('/\xA0/u',' ', $request->file('avatar')->getClientOriginalName());

        $avatar_label = mb_strtolower(preg_replace('/\s+/','-',$avatar_name));
        $avatar_storage_name = $id . '_' . time() . '_' . $avatar_label;

        $user->addAvatar($avatar_name,$avatar_label,$avatar_storage_name);        
        $user->profile->avatar = $avatar_name;
        $user->profile->avatar_filename = $avatar_storage_name;
        $user->profile->save();
       
        $request->file('avatar')->storeAs( 'avatars' , $avatar_storage_name );

        Session::flash('flash_success', 'Avatar has been uploaded!');

        return back();
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
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {   
        $this->validate($request, [
            'avatar_id' => ['required','numeric'],
            'avatar_name' => ['required','string']
        ]);

        $avatar = Avatar::findOrFail($request->avatar_id);
        
        $avatar->user->profile->avatar = $request->avatar_name;
        
        $avatar->name = $request->avatar_name;
        $avatar->label = mb_strtolower(preg_replace('/\s+/','-',$request->avatar_name));

        if ( !$avatar->save() && !$avatar->user->profile->save() ) {
            return back()->with('error', 'Not saved...');
        }

        return back()->with('success', 'Avatar name updated! - '.$request->avatar_id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (isset($id) && !empty($id) && is_numeric($id)){

            $avatar = Avatar::findOrFail($id);

            //$user_profile = UserProfile::where('user_id', Auth::user()->id)->first();

            if ( $avatar->filename === $avatar->user->profile->avatar_filename ) {
                $avatar->user->profile->avatar = 'default';
                $avatar->user->profile->avatar_filename = 'default.png';
                $avatar->user->profile->save();
            }

            Storage::delete('avatars/' . $avatar->filename);
            $avatar->destroy($id);

            Session::flash('flash_success', 'File Deleted!');
            return back();

        } else {

            Session::flash('flash_error', 'ID not valid');
            return back();
        }
    }

    //change avatar in profile
    public function select(Request $request)
    {
        $this->validate($request, [
            'avatar_id'         =>  ['required','numeric'],
            'avatar_name'       =>  ['required','string'],
            'avatar_filename'   =>  ['required','string']
        ]);

        $user_profile = UserProfile::where('user_id', Auth::user()->id)->first();
        $user_profile->avatar = $request->avatar_name;
        $user_profile->avatar_filename = $request->avatar_filename;

        $user_profile->save();

        Session::flash('flash_success', 'Avatar changed!');
        return back();        
    }
}