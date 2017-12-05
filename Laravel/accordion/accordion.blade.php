<div class="tabs">
	<ul class="nav nav-tabs" role="tablist">
		<li class="nav-item">
			<a class="nav-link active" data-toggle="tab" href="#Profile" role="tab">Profile</a>
		</li>

		<li class="nav-item">
			<a class="nav-link" data-toggle="tab" href="#Avatar" role="tab">Tab</a>
		</li>
	</ul>

	<div class="tab-content">
		@component ('panel.tab', array('title' => 'Profile', 'class' => 'active'))

			Profile slot
		@endcomponent

		@component ('panel.tab', array('title' => 'Avatar'))
			
			Avatar slot
		@endcomponent
	</div>
</div>