use zed_extension_api::{self as zed, Result};

struct CrabbyExtension;

impl zed::Extension for CrabbyExtension {
    fn new() -> Self {
        Self
    }
    
    fn language_server_command(&mut self, _language_server_id: &zed::LanguageServerId, _worktree: &zed::Worktree,) -> Result<zed::Command> {
        Ok(zed::Command{
            command: "".to_string(),
            args: vec![],
            env: Default::default(),
        })
    }
}

zed::register_extension!(CrabbyExtension);
