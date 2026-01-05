module.exports = grammar({
    name: "Crabby",
    
    extras: $ => [
        /\s/,
        $.comment,
    ],
    
    rules: {
        source_file: $ => repeat($._statement), _statement: $ => choice(
            $.function_definition,
            $.expression,
        ),
        
        function_definition: $ => seq(
            choice("def", "fun"),
            $.identifier,
            "(",
            optional($.parameters),
            ")",
            $.block
        ),
        
        parameters: $ => sep1($.identifier, ","),
        block: $ => seq(
            "{",
            repeat($.expression),
            "}",
        ),
        
        expression: $ => choice(
            $.string,
            $.number,
            $.identifier,
        ),
        
        string: $ => choice(
            seq('"', repeat(/[^"]/), '"'),
            seq("'", repeat(/[^']/), "'")
        ),
        
        number: $ => /\d+(\.\d+)?/,
        
        identifier: $ => /[a-zA-Z_] [a-zA-Z-0-9_]*/,
        
        comment: $ => token(seq("//", /.*/)),
    }
});

function sep1(rule, separator) {
    return seq(rule, repeat(seq(separator, rule)));
}
