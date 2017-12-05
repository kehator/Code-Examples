<div class="links">
	@component ('panel.collapse', array(
		'heading_title'	=>	'General Settings',
		'div_id' 		=>	'General_div', 
		'heading_id' 	=>	'General_heading',
		'collapse_id'	=>	'General_collapse'
	))
		<ul>
			<li><a href="{{ route('myProfile') }}">My Profile</a></li>
			<li><a href="{{ route('myProfileAvatar') }}">My Avatar</a></li>			
		</ul>
		
	@endcomponent
</div>