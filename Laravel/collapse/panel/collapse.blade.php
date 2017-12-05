<div id="{{ $div_id ?? 'accordion' }}" role="tablist" aria-multiselectable="true">
	<div class="card">
		<div class="card-header" role="tab" id="{{ $heading_id ?? 'headingOne' }}">
		<h5 class="">
			<a data-toggle="collapse" data-parent="#{{ $div_id ?? 'accordion' }}" href="#{{ $collapse_id ?? 'collapseOne' }}" aria-expanded="true" aria-controls="{{ $collapse_id ?? 'collapseOne' }}">
				{{ $heading_title ?? 'default' }}
			</a>
		</h5>
		</div>

		<div id="{{ $collapse_id ?? 'collapseOne' }}" class="collapse {{ $class ?? '' }}" role="tabpanel" aria-labelledby="{{ $heading_id ?? 'headingOne' }}">
		  <div class="card-block">
		    {{ $slot }}
		  </div>
		</div>
	</div>
</div>