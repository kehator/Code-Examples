@extends('layouts.app')

@section('content')
{{-- {{ dd($myAvatar) }} --}}
<div class="container-fluid">
    <div class="row">
    	<div class="col-3">
			@include('profile.sidebar')
		</div>
		<div class="col-9">
	        <div class="col-md-8 col-md-offset-2">
	            @include('components.notifications')
	            <div class="panel panel-default">
	                <div class="panel-heading">Profile</div>
	                <div class="panel-body">
	                    This is your profile<br><br>
	                    <span style="color:green">User Array:</span> {{ Auth::user() }}<br><br>
	                </div>
	            </div>
	            <div class="panel panel-default">
	                <div class="panel-heading">Avatar</div>
	                <div class="panel-body">
	                    <div class=col-md-6>
	                        Upload avatar<br><br>
	                        
	                        <form method="POST" action="/profile/storeAvatar" accept-charset="UTF-8" enctype="multipart/form-data">
	                            {{ csrf_field() }}
	                            <div class="form-group">
	                                <label for="file">Select Photo</label>
	                                <input id="avi" name="avatar" class="btn btn-default btn-file" type="file" required>
	                            </div>
	                            <div class="form-group">
	                                <input value="Clear" class="form-button" type="reset">
	                            </div>
	                            <div class="form-group">
	                                <input value="Send" class="btn btn-primary" type="submit">
	                            </div>
	                        </form>

	                    </div>
	                    <div class=col-md-6>
	                        <img alt="{{ $myAvatar->name }}" src="{{ $myAvatar->path }}" width=150>
	                    </div>
	                </div>
	            </div>
	            <div class="panel panel-default">
	                <div class="panel-heading">All Avatars</div>
	                <div class="panel-body">
	                    List of avatars:<br><br>
	                    <div class="row">
	                        @foreach (Auth::user()->avatars as $avatar)
	                            <div class="col col-sm-6 col-xs-12{{ $myAvatar->filename === $avatar->filename ? ' selected_avatar' : '' }}" style="margin-bottom: 20px;">

	                                <div class="col-12 image">
	                                	<img style="max-width: 150px; margin-bottom: 10px;" src="/storage/avatars/{{ $avatar->filename }}" alt="{{ $avatar->name }}"/>
	                                </div>                          
	                         
	                                <div class="col-12 update">
	                                    <form method="POST" class="form-inline" action="/profile/updateAvatar" accept-charset="UTF-8">
	                                        {{ csrf_field() }}
	                                        <input name="avatar_id" type="hidden" value="{{ $avatar->id }}" required>
	                                        <div class="form-group">
	                                            <input name="avatar_name" class="form-control" type="text" value="{{ $avatar->name }}" required>
	                                        </div>
	                                        <div class="form-group">
	                                            <input value="Save" class="btn" type="submit">
	                                        </div>
	                                    </form>
	                                </div>                          
	                      
	                                <div class="col-6 delete">
	                                    <form method="POST" class="form-inline" action="/profile/destroyAvatar/{{ $avatar->id }}" accept-charset="UTF-8">
	                                        {{ csrf_field() }}                                        
	                                        {{ method_field('DELETE') }}
	                                        <div class="form-group">
	                                            <input value="Delete" class="form-control" type="submit">
	                                        </div>
	                                    </form>
	                                </div>
	                                <div class="col-6 select">
	                                    <form method="POST" class="form-inline" action="/profile/selectAvatar" accept-charset="UTF-8">
	                                        {{ csrf_field() }}
	                                        <input name="avatar_id" type="hidden" value="{{ $avatar->id }}" required>
	                                        <input name="avatar_name" type="hidden" value="{{ $avatar->name }}" required>
	                                        <input name="avatar_filename" type="hidden" value="{{ $avatar->filename }}" required>
	                                        <div class="form-group">
	                                            <input value="Select" class="form-control" type="submit">
	                                        </div>
	                                    </form>
	                                </div>

	                            </div>

	                        @endforeach
	                    </div>                    
	                </div>
	            </div>
	        </div>			
		</div>
    </div>
</div>
@endsection
