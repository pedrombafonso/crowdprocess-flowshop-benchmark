<tpl>
<div class="field">
	<label>Nazwa przesłanki : </label>
	<select>
		{{#premises}}
			<option value="{{name}}">{{name}}</option>
		{{/premises}}
	</select>
	<label class="name">Prawda/fałsz</label><input type="checkbox" name="nazwa" value="value" />
</div>
</tpl>